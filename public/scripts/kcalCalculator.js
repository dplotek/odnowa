const custombtn = document.querySelector("#calculate")
const sexInputs = [...document.querySelectorAll("input[name='gender']")]
const weightInput = document.querySelector("#weight")
const heightInput = document.querySelector("#height")
const ageInput = document.querySelector("#age")
const activityInput = document.querySelector("#physical_activity_slider")
const activitySelectedValueSpan = document.querySelector("#physical_activity_paragraph")
const goalInputs = [...document.querySelectorAll("input[name='goal'")]
const resultSpan = document.querySelector('#result')
const genderField = document.querySelector("#gender_field")

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

const showActivityValue = () => {
  activitySelectedValueSpan.textContent = physicalActivityValues[activityInput.value]
}

activityInput.addEventListener('input', showActivityValue)

const getValues = () => {
  const sexValue = sexInputs.find(item => item.checked).value ?? false
  const weightValue = weightInput.value
  const heightValue = heightInput.value
  const ageValue = ageInput.value
  const activityValue = activityInput.value
  const goalValue = goalInputs.find(item => item.checked).value
  
  return {
      sexValue, 
      weightValue, 
      heightValue, 
      ageValue, 
      activityValue, 
      goalValue
  }
}

const isFieldValid = (field, value) => {
  if(value === undefined) {
    const errorMessageParagraph = document.createElement("p")
    errorMessageParagraph.textContent = "Pole wymagane"
    field.appendChild(errorMessageParagraph)
    console.log(field)
    return false
  }
}

const validateFields = () => {
  const {sexValue, weightValue, heightValue, ageValue, activityValue, goalValue} = getValues()
  
  isFieldValid(genderField,sexValue)
  return false
}

const calculateFemale = (
  weightValue, 
  heightValue,
  ageValue, 
  activityValue
  ) => {
  const calculatedWeight = 9.563 * Number(weightValue)
  const calculatedHeight = 1.85 * Number(heightValue)
  const calculatedAge = 4.676 * Number(ageValue)
  return (655.1 + calculatedWeight + calculatedHeight - calculatedAge) * physicalActivityValues[activityInput.value - 1]
}

const calculateMale = (
  weightValue, 
  heightValue,
  ageValue, 
  activityValue
  ) => {
  const calculatedWeight = 13.75 * Number(weightValue)
  const calculatedHeight = 5.003 * Number(heightValue)
  const calculatedAge = 6.775 * Number(ageValue)
  return (66,5 + calculatedWeight + calculatedHeight - calculatedAge) * physicalActivityValues[activityInput.value - 1]
}

const calculateKcal = () => {
  const {sexValue, weightValue, heightValue, ageValue, activityValue, goalValue} = getValues()
  const addActivity = goalValue === "goal1" 
      ? 300
      : goalValue === "goal3"
          ? -300
          : 0
          
  if(sexValue === "FEMALE") {
      const result = calculateFemale(weightValue, heightValue, ageValue, activityValue) - addActivity
      resultSpan.textContent = Math.round(result)
  } else if (sexValue === "MALE") {
      const result = calculateMale(weightValue, heightValue, ageValue, activityValue) - addActivity
      resultSpan.textContent = Math.round(result)
  }
}
custombtn.addEventListener('click', () => {
  console.log(validateFields())
  // validateFields() && calculateKcal()
} )