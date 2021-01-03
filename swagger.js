exports.swaggerDocument = {
    "openapi": "3.0.1",
    "info": {
      "title": "Shop App",
      "description": "Backend App to manage a shop.",
      "contact": {
        "email": "krzysztof.dziedzic175@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "version": "1.0.0"
    },
    "tags": [
      {
        "name": "shop",
        "description": "Zarządzanie produktami"
      },
      {
        "name": "email",
        "description": "Kontakt pomiędzy użytkownikami"
      }
    ],
    "paths": {
      "/api/products": {
        "get": {
          "tags": [
            "shop"
          ],
          "summary": "Get all products",
          "operationId": "getAllProducts",
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Product"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong while getting data from firestore.",
              "content": {}
            }
          }
        }
      },
      "/api/users/products": {
        "get": {
          "tags": [
            "shop"
          ],
          "summary": "Get all user's products",
          "operationId": "getAllUsersProducts",
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Product"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {}
            },
            "500": {
              "description": "Something went wrong while getting data from firestore.",
              "content": {}
            }
          }
        },
        "post": {
          "tags": [
            "shop"
          ],
          "summary": "Create a new product",
          "operationId": "createNewProduct",
          "requestBody": {
            "description": "Product object that needs to be added to the store",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCreate"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ProductCreate"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad body"
            },
            "401": {
              "description": "Unauthorized",
              "content": {}
            },
            "500": {
              "description": "Something went wrong while creating object in firestore.",
              "content": {}
            }
          }
        }
      },
      "/api/users/products/{productId}": {
        "get": {
          "tags": [
            "shop"
          ],
          "summary": "Get user's product by Id",
          "operationId": "getUserProductById",
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {}
            },
            "500": {
              "description": "Something went wrong while getting data from firestore.",
              "content": {}
            }
          }
        },
        "patch": {
          "tags": [
            "shop"
          ],
          "summary": "Update product with given Id",
          "operationId": "Update product",
          "requestBody": {
            "description": "Product's data to update",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCreate"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ProductCreate"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad body"
            },
            "401": {
              "description": "Unauthorized",
              "content": {}
            },
            "500": {
              "description": "Something went wrong while updating data in firestore.",
              "content": {}
            }
          }
        },
        "delete": {
          "tags": [
            "shop"
          ],
          "summary": "Delete product by Id",
          "operationId": "deleteProduct",
          "responses": {
            "201": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductRemove"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {}
            },
            "500": {
              "description": "Something went wrong while removing object in firestore.",
              "content": {}
            }
          }
        }
      },
      "/api/send_email": {
        "post": {
          "tags": [
            "email"
          ],
          "summary": "Send an email to user",
          "operationId": "sendEmail",
          "requestBody": {
            "description": "Email data that needs to be sent",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Email"
                }
              }
            },
            "required": true,
            "responses": {
              "200": {
                "description": "Successful operation",
                "content": {}
              },
              "400": {
                "description": "Bad body"
              },
              "401": {
                "description": "Unauthorized",
                "content": {}
              },
              "500": {
                "description": "Something went wrong while sending an email.",
                "content": {}
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Product": {
          "type": "object",
          "properties": {
            "productId": {
              "type": "string",
              "example": "0vUDoaaLxqemkm8OArfO"
            },
            "price": {
              "type": "string",
              "example": "2099"
            },
            "ownerId": {
              "type": "string",
              "example": "Z1L5IMziSTfBDNDMpYzP9JwCcaI3"
            },
            "name": {
              "type": "string",
              "example": "example name"
            },
            "isPublished": {
              "type": "boolean",
              "example": true
            },
            "description": {
              "type": "string",
              "example": "example description"
            },
            "imageUrl": {
              "type": "string",
              "example": "https://firebasestorage.googleapis.com/v0/b/blog-cms-74abf.appspot.com/o/images%2F1609271948388_nowy_obraz.jpg%7D?alt=media&token=81caab2e-e4cd-4b49-9afc-798381b2b52c"
            }
          }
        },
        "ProductCreate": {
          "type": "object",
          "properties": {
            "price": {
              "type": "string",
              "example": "2099"
            },
            "name": {
              "type": "string",
              "example": "example name"
            },
            "isPublished": {
              "type": "boolean",
              "example": true
            },
            "description": {
              "type": "string",
              "example": "example description"
            },
            "imageUrl": {
              "type": "string",
              "example": "https://firebasestorage.googleapis.com/v0/b/blog-cms-74abf.appspot.com/o/images%2F1609271948388_nowy_obraz.jpg%7D?alt=media&token=81caab2e-e4cd-4b49-9afc-798381b2b52c"
            }
          }
        },
        "ProductRemove": {
          "type": "object",
          "properties": {
            "removedId": {
              "type": "string",
              "example": "0vUDoaaLxqemkm8OArfO"
            }
          }
        },
        "Email": {
          "type": "object",
          "properties": {
            "recEmail": {
              "type": "string",
              "example": "example@gmail.com"
            },
            "subject": {
              "type": "string",
              "example": "Example subject"
            },
            "message": {
              "type": "string",
              "exmaple": "Example message"
            }
          }
        }
      }
    }
  }