# Gaming Spot

This repository contains the source code for a React-based e-commerce shop for gaming accessories. The shop allows users to browse and purchase various gaming accessories such as mice, keyboards, gaming chairs, and desk mats.

The project is organized into several components, each responsible for a specific functionality:

## Components

### `AccessoryDetail Component`

The AccessoryDetail component displays the details of a specific accessory. It retrieves the accessory data based on the provided productId and renders the accessory image, name, description, brand, and price. Users can add the accessory to the cart and navigate back to the previous page.


### `Accessories Component`

The Accessories component displays a list of accessories. It receives a list of categories and filters the accessories based on the selected categories. Each accessory is displayed as a card, showing the image, name, description, and price. Users can view the accessory details and add it to the cart.

### `CartWidget Component`

The CartWidget component represents a cart icon with a counter indicating the number of items in the cart. It provides a visual indication of the cart status and can be placed in the navigation bar or any other appropriate location within the application.

### `Category Component`

The Category component displays a list of accessories belonging to a specific category. It filters the accessories based on the provided productCategory and renders them as cards, similar to the Accessories component. Users can view the accessory details and add it to the cart.

### `Navbar Component`

The Navbar component represents the navigation bar of the application. It includes the logo of the shop, "Gaming Spot," and navigation links to different sections of the shop. The navigation links allow users to browse the shop's main page, as well as specific accessory categories. The CartWidget component is also included in the navigation bar to display the cart icon and item count.

### `Shop Component`

The Shop component serves as the main page of the shop. It renders the Accessories component, which displays all available accessories. The page includes a heading, "All Accessories," and the list of accessories is rendered by the Accessories component

## Technologies Used

The project utilizes the following technologies:

#### React: A JavaScript library for building user interfaces.
#### React Router: A library for routing in a React application.
#### HTML and CSS: Markup and styling for the application's components.
#### JSON: Data files containing information about the gaming accessories.
#### Phosphor Icons: A library providing icons for the cart widget.

### Future Improvements

Implement shopping cart functionality, including adding and removing items.
Create a checkout process for users to complete their purchases.
Improve the design and layout of the components to enhance the user experience.
Implement user authentication and user-specific features, such as wishlists and order history.