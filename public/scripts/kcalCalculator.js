const calculateButton = document.querySelector("#calculate")
//gender
const genderInputs = [...document.querySelectorAll("input[name='gender']")]
const genderField = document.querySelector("#gender_field")
//weight
const weightInput = document.querySelector("#weight")
const weightField = document.querySelector("#weight_field")
//height
const heightInput = document.querySelector("#height")
const heightField = document.querySelector("#height_field")
//age
const ageInput = document.querySelector("#age")
const ageField = document.querySelector("#age_field")
//goal
const goalInputs = [...document.querySelectorAll("input[name='goal'")]
const goalField = document.querySelector("#goal_field")

const activityInput = document.querySelector("#physical_activity_slider")
const activitySelectedValueSpan = document.querySelector("#physical_activity_paragraph")
const resultSpan = document.querySelector('#result')
const form = document.querySelector("#form")
const formWrapper = document.querySelector("#form_wrapper")

const getGenderLabel = (gender) => {
  switch(gender) {
    case "MALE":
      return "mężczyzny"
    case "FEMALE":
      return "kobiety"
    default: return ""
  }
}

const getGoalLabel = (goal) => {
  switch(goal) {
    case "goal1":
      return "schudnąć"
    case "goal2":
      return "utrzymać wagę"
    case "goal3":
      return "przytyć"
  }
}

const createSummaryReport = (gender, age, weight, height, goal, kcal, protein, carbo, fat) => {
  formWrapper.removeChild(form)

  const wrapper = document.createElement("div")
  wrapper.classList.add("max-w-screen-xl", "mx-auto", "flex", "px-6", "py-8", "bg-neutral-900", 'rounded-lg', 'my-12', "flex-col")
  
  const header = document.createElement("h3")
  header.classList.add('text-3xl', 'font-bold')
  header.textContent = "Twój wynik"

  const description = document.createElement("div")
  description.classList.add("my-6", 'text-lg')
  description.innerHTML = `<p> Dla <strong>${getGenderLabel(gender)}</strong> w wieku <strong>${age}</strong> o wadze <strong>${weight}kg</strong> i wzroście <strong>${height}cm</strong> przy wybranej aktywności, żeby <strong>${getGoalLabel(goal)}</strong> wyniki wyglądają następująco:</p>`

  const kcalInfo = document.createElement("div")
  kcalInfo.innerHTML = `<p>Kalorie: <strong>${kcal}kcal</strong><p>`

  const proteinInfo = document.createElement("div")
  proteinInfo.innerHTML = `<p>Białko: <strong>${protein}g</strong> co daje <strong>${protein * 4}kcal</strong> z białka<p>`

  const carboInfo = document.createElement("div")
  carboInfo.innerHTML = `<p>Węglowodany: <strong>${carbo}g</strong> co daje <strong>${carbo * 4}kcal</strong> z węglowodanów</p>`

  const fatInfo = document.createElement("div")
  fatInfo.innerHTML = `<p>Tłuszcz: <strong>${fat}g</strong> co daje <strong>${fat * 9}kcal</strong> z tłuszczy</p>`
  
  wrapper.appendChild(header)
  wrapper.appendChild(description)
  wrapper.appendChild(kcalInfo)
  wrapper.appendChild(proteinInfo)
  wrapper.appendChild(carboInfo)
  wrapper.appendChild(fatInfo)
  formWrapper.appendChild(wrapper)
}

const physicalActivityValues = [
  1,
  1.05,
  1.1,
  1.15,
  1.2,
  1.25,
  1.3,
  1.35,
  1.4,
  1.45,
  1.5,
  1.55,
  1.6,
  1.65,
  1.7,
  1.75,
  1.8,
  1.85,
  1.9,
  1.95,
  2,
  2.05,
  2.1,
  2.15,
  2.2,
  2.25,
  2.3,
  2.35,
  2.4,
  2.45,
  2.5
]

activityInput.addEventListener('input', () => {
  activitySelectedValueSpan.textContent = physicalActivityValues[activityInput.value]
})

const createErrorMessage = (field) => {
  const errorMessageParagraph = document.createElement("p")
  errorMessageParagraph.textContent = "Pole wymagane"
  errorMessageParagraph.classList.add('ml-2', 'mb-1' ,'text-rose-500')
  errorMessageParagraph.setAttribute("error", "error")
  
  !field.querySelector('p[error=error]') 
    ? field.appendChild(errorMessageParagraph)
    : null
}

const removeErrorMessage = (field) => {
  field.querySelector('p[error=error]') 
    ? field.removeChild(field.querySelector('p[error=error]'))
    : null
}

const validateField = (field, value) => {
  if(!value) {
    createErrorMessage(field)
  } else {
    removeErrorMessage(field)
  }
}

const getAllValues = () => {
  const genderValue = genderInputs.find(item => item.checked) 
    ? genderInputs.find(item => item.checked).value
    : false

  const goalValue = goalInputs.find(item => item.checked) 
    ? goalInputs.find(item => item.checked).value
    : false

  const weightValue = !['','0'].includes(weightInput.value) 
    ? weightInput.value
    : false

  const heightValue = !['','0'].includes(heightInput.value) 
    ? heightInput.value
    : false

  const ageValue = !['','0'].includes(ageInput.value) 
    ? ageInput.value
    : false

  const activityValue = activityInput.value

  const fieldsToValidate = [
    {
      field: genderField,
      value: genderValue
    },
    {
      field: goalField,
      value: goalValue
    },
    {
      field: weightField,
      value: weightValue,
    },
    {
      field: heightField,
      value: heightValue,
    },
    {
      field: ageField,
      value: ageValue,
    },
  ]

  fieldsToValidate.forEach(item => validateField(item.field, item.value))
  
  return {
    genderValue,
    goalValue,
    weightValue,
    heightValue,
    ageValue,
    activityValue
  }
}

const calculateFemale = (
  weightValue, 
  heightValue,
  ageValue, 
  ) => {
  const calculatedWeight = 9.563 * Number(weightValue)
  const calculatedHeight = 1.85 * Number(heightValue)
  const calculatedAge = 4.676 * Number(ageValue)
  return (655.1 + calculatedWeight + calculatedHeight - calculatedAge) * physicalActivityValues[activityInput.value]
}

const calculateMale = (
  weightValue, 
  heightValue,
  ageValue, 
  ) => {
  const calculatedWeight = 13.75 * Number(weightValue)
  const calculatedHeight = 5.003 * Number(heightValue)
  const calculatedAge = 6.775 * Number(ageValue)
  return (66,5 + calculatedWeight + calculatedHeight - calculatedAge) * physicalActivityValues[activityInput.value]
}

const calculateKcal = () => {
  const {
    genderValue,
    goalValue,
    weightValue,
    heightValue,
    ageValue,
    activityValue
  } = getAllValues()

  const isFormValid = [genderValue, goalValue,weightValue,heightValue,ageValue,activityValue].every(item => !!item)
  console.log(isFormValid)

  const addActivity = goalValue === "goal1" 
      ? 300
      : goalValue === "goal3"
          ? -300
          : 0
          
  if(genderValue === "FEMALE" && isFormValid) {
      const kcal = Math.round(calculateFemale(weightValue, heightValue, ageValue, activityValue) - addActivity)
      const protein = Math.round(weightValue * 1.6)
      const fat = Math.round(weightValue * 0.8)
      const carbo = (kcal - (protein * 4 + fat * 9)) / 4

      createSummaryReport(
        genderValue,
        ageValue,
        weightValue,
        heightValue,
        goalValue,
        kcal,
        protein,
        carbo,
        fat
      )
  } else if (genderValue === "MALE" && isFormValid) {
      const kcal = Math.round(calculateMale(weightValue, heightValue, ageValue, activityValue) - addActivity)
      const protein = Math.round(weightValue * 1.6)
      const fat = Math.round(weightValue * 0.8)
      const carbo = (kcal - (protein * 4 + fat * 9)) / 4

      createSummaryReport(
        genderValue,
        ageValue,
        weightValue,
        heightValue,
        goalValue,
        kcal,
        protein,
        carbo,
        fat
      )
  }
}

calculateButton.addEventListener('click', () => {
  calculateKcal()
} )