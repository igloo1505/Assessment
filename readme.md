# Crescendo Collective - Frontend Skill Test

## Goals

### - Pull the data from the API

- I wanted to make this as realistic as possible, and since I was first able to get back to my computer on Friday afternoon I thought it'd be a good idea to build a Node & Express backend rather than use JSON server.

## - Create a list view which includes all the recipes

## - Create a recipe detail view to display each recipe

## - Ingredients with a matching `ingredientId` listed in the specials response should also show the special `title`, `type` and `text` under the ingredient name

## - _Bonus:_ Create a view to add and update recipes or specials. Image upload not required. Both endpoints support GET, POST and PATCH.

- `npm i`
- `cd client && npm i`
  If using new database - `npm run seed`
  To run with mongo connection:
  .env file should include:
  JWT_SECRET
  GOOGLE_SERVER_KEY
  DB_PASSWORD - `npm run dev`
  To run with JSON server: - `npm run dev:jsonServer`

#### Endpoints & Schema

## In order to make this resemble more of a real world application, I did add a separate model, created a couple relations & sub-models, and added a couple data points to existing models. The original models can be seeded without conflicts though, and the new object keys are stored in the same format as similar keys that already existed (dates, times, locations, etc.).

#### New Model: User

```JSON
[
User {
  name: String
  email: String
  password: String
  favorites: Array of Recipe.refs
  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    geo: {
      lat: Number, lng: Number
    }
  }
  date_created: String
}
]
```

#### Keys Added:

To Recipes:
submittedBy: User.ref
isPublic: boolean (user access is regulated with JWTs)

##### GET `/recipes`

```JSON
[
  Recipe {
    uuid: String
    title: String
    description: String
    images: {
      full: String
      medium: String,
      small: String
    }
    servings: Number
    prepTime: Number
    cookTime: Number
    postDate: Date
    editDate: Date
    ingredients: [
      Ingredient {
        uuid: String
        amount: Number
        measurement: String
        name: String
      }
    ]
    directions: [
      Direction {
        instructions: String
        optional: Boolean
      }
    ]
  }
]
```

##### GET `/specials`

Specials on ingredients

```json
[
  Special {
    uuid: String
    ingredientId: String
    type: String
    title: String
    geo: String (optional)
    text: String (optional)
  }
]
```
