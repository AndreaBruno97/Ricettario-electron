'use strict';
const constants = require('../constants.js')

var Datastore = require('nedb-promises');
const path = require('path');

var recipes

exports.createRecipesDb = function () {
    recipes = Datastore.create({ filename: `${path.join(__dirname, '../storage/db/recipes.db')}`, autoload: true });
}

exports.getRecipes = async function (pageNumber = 0, pageSize = constants.DEFAULT_PAGE_SIZE) {
    return recipes
                .find()
                .sort({name: 1})
                .skip(pageNumber * pageSize)
                .limit(pageSize)
}

exports.addRecipe = async function (recipe) {
    return recipes.insert(recipe)
}

exports.updateRecipe = async function (recipe) {
    return recipes.update({_id: recipe._id}, recipe)
}

exports.deleteRecipe = async function (recipeId){
    return recipes.remove({_id:recipeId})
}