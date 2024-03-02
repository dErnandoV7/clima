const keyApi = "9dccca92c39fd0716c482205a342b1a3"

// Seleção de elementos
const form = document.querySelector(".search-city")
const cityEl = document.querySelector(".city-title")
const tempEl = document.querySelector(".temp-city span")
const climateEl = document.querySelector(".climate")
const messege = document.querySelector(".messege")

// Funções
const getDataCity = async (city) => {

    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyApi}&lang=pt_br`
    const res = await fetch(urlApi)
    const data = await res.json()

    return data
}

const initialize = async () => {
    const data = await getDataCity("ceara")

    setDate(data.name, parseInt(data.main.temp), data.weather[0].description)
}

const setDate = (city, temp, climate) => {
    cityEl.textContent = city
    tempEl.textContent = temp
    climateEl.textContent = climate
}

const showMessege = () => {
    messege.style.transform = "translateX(0)"

    setTimeout(() => {
        messege.style.transform = "translateX(-100%)"
    }, 3000)
}

// Eventos
form.addEventListener("submit", e => {
    e.preventDefault()

    if (!form.city.value) return

    const changeTextElements = async () => {
        const data = await getDataCity(form.city.value)

        if (data.cod == "404") return showMessege()

        setDate(data.name, parseInt(data.main.temp), data.weather[0].description)
    }

    changeTextElements()

    form.reset()
})

// Initialize
initialize()