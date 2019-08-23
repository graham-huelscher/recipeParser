const ingredientLookup = require('./data/ingredientList')
const units = require('./data/units')
const preconversion = require('./data/preconversion')

const str = `3 lb chicken thighs cut into bite-sized pieces
1.5 zucchini sliced or cubed
6 Tbsp oil divided
3 Tbsp butter
3 cup broccoli cut into florets
3 small carrot julienned or cubed
24 oz mushrooms sliced
1.5 red pepper cubed
12 garlic cloves minced
3 tsp fresh ginger minced
1.5 onion cubed
¾ cup cashews`


function parse(str) {
  const newIngredientObj = ingredientParser(str.replace(/[^\w\s\¼\½\¾\\\.\/]/g, "").toLowerCase())
}

function ingredientParser(str) {

  let ingredLines = str.split("\n")

  const ingredObj = {}
  ingredLines.forEach(ingredLine => {

    console.log(ingredLine)

    const amount = getAmount(ingredLine)
    ingredLine = ingredLine.slice(amount.length + 1)

    const unit = getUnit(ingredLine)

    if (unit !== "N/A")
      ingredLine = ingredLine.slice(unit.length + 1)

    const ingredient = getIngred(ingredLine) || ingredLine

    ingredObj[ingredient] = {}
    ingredObj[ingredient].amount = preconversion[amount] || amount
    ingredObj[ingredient].unit = unit
  })
   console.log(ingredObj)
   return ingredObj
}

getAmount = (ingredLine) => {

  let amount = ""
  for (let i = 0; i < ingredLine.length; i++) {
    let char = ingredLine.charAt(i)
    if (char === " ") break;
    else amount += char
  }
  return amount
}

getUnit = (ingredLine) => {
  for (let unit of Object.keys(units)) {
    const index = ingredLine.indexOf(unit)
    if (index !== -1) {
      if ((index === 0 && ingredLine.charAt(index + unit.length) === " ") || (ingredLine.charAt(index - 1) === ' ' && ingredLine.charAt(index + unit.length) === ' ') || (ingredLine.charAt(index + unit.length) === ' ' && index + unit.length === ingredLine.length))
        return unit
    }
  }
  return "N/A"
}

getIngred = (ingredLine) => {
  for (let i = 0; i < ingredLine.length; i++) {
    let remainingStr = ingredLine.slice(0, ingredLine.length - i)
    if (ingredientLookup[remainingStr])
      return remainingStr
  }
  return false

}

parse(str)

//console.log(getIngred('zucchini sliced or cubed'))