# Frontend Mentor - Product list with cart

![Design preview for the Product list with cart coding challenge](./preview.jpg)

# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Live Site URL: [My solution on GitHub Pages](https://andreipsarev.github.io/product-list-with-cart-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript
- State-based UI updates
- Event delegation

### What I learned

While working on this project, I focused on **state management without frameworks** and syncing UI with application state.

Key things I learned:

- How to manage a cart using a single global `state` object
- How to fully re-render UI based on state instead of manually updating DOM elements
- How to use **event delegation** for dynamically generated buttons
- How to build a responsive modal that behaves differently on desktop and mobile
- How to keep logic and UI updates separated using a central `updateUI()` function

## Author

- Frontend Mentor - [@andreiPsarev](https://www.frontendmentor.io/profile/andreiPsarev)
