//menu burger

const menuBurger = document.querySelector(".menu__burger-list");
const menuList = document.querySelector(".menu__list");

document.addEventListener("click", function (e) {
  const onElement = e.composedPath().includes(menuList);
  const onElementBurger = e.composedPath().includes(menuBurger);

  if (onElementBurger || onElement) {
    menuList.classList.toggle("menu__list--active");
    menuBurger.classList.toggle("menu__burger--active");
  } else if (!onElement) {
    menuList.classList.remove("menu__list--active");
    menuBurger.classList.remove("menu__burger--active");
  }
});

//accordeon prices detailes

document.querySelectorAll(".prices__button-rates").forEach((el) => {
  el.addEventListener("click", (e) => {
    const pricesItem = e.target.closest(".prices__rates-item");
    const priceDetails = pricesItem.childNodes[3];

    const removeClassActive = () => {
      document.querySelectorAll(".prices__rates-item").forEach((el) => {
        const priceDetails = el.childNodes[3];
        const buttonPrice = el.childNodes[1].childNodes[3];
        el.classList.remove("prices__rates-item--active");
        priceDetails.classList.remove("prices__detailes--opened");
        buttonPrice.classList.remove("prices__button-rates--active");
      });
    };

    if (e.currentTarget.classList.contains("prices__button-rates--active")) {
      removeClassActive();
      return;
    }

    removeClassActive();

    el.classList.add("prices__button-rates--active");
    pricesItem.classList.add("prices__rates-item--active");
    priceDetails.classList.add("prices__detailes--opened");
  });
});

//menu contacts select

const menuContacts = document.querySelector(".contacts__menu");
const menuSelect = document.querySelector(".contacts__menu-select");
const contactsSelectText = document.querySelector(".contacts__text");
const contactsMenuOpen = document.querySelectorAll(".contacts__menu-open");
const contactsMenuButton = document.querySelector(".contacts__button");
const contactsImg = document.querySelector(".contacts__inner-img");
const contactsMenuInner = document.querySelector(".contacts__menu-inner");

menuContacts.addEventListener("click", function (e) {
  menuSelect.classList.toggle("contacts__menu-select--active");
  menuContacts.classList.toggle("contacts__menu--active");
  contactsMenuButton.classList.toggle("contacts__button--active");

  if (contactsSelectText.innerHTML !== "City") {
    menuContacts.classList.add("contacts__menu--active");
    contactsMenuButton.classList.add("contacts__button--active");
  }
});

document.querySelectorAll(".contacts-select__item").forEach((el) => {
  el.addEventListener("click", () => {
    const removeSelectActive = () => {
      menuSelect.classList.remove("contacts__menu-select--active");
      contactsMenuOpen.forEach((el) => {
        el.classList.remove("contacts__menu-open--active");
      });
    };

    const addContacts = (address) => {
      if (document.documentElement.clientWidth < 440) {
        if (contactsSelectText.innerHTML === "City") {
          contactsImg.style.display = "block";
        } else contactsImg.style.display = "none";
        contactsMenuInner.style.paddingBottom = "256px";
      }
      document.querySelectorAll(".contacts__menu-open").forEach((el) => {
        if (
          el.childNodes[1].childNodes[3].childNodes[1].innerHTML === address
        ) {
          el.classList.add("contacts__menu-open--active");
        }
      });
    };

    if (el.innerHTML === "Canandaigua, NY") {
      contactsSelectText.innerHTML = "Canandaigua, NY";
      removeSelectActive();
      addContacts("Canandaigua, NY");
    } else if (el.innerHTML === "New York City") {
      contactsSelectText.innerHTML = "New York City";
      removeSelectActive();
      addContacts("New York City");
    } else if (el.innerHTML === "Yonkers, NY") {
      contactsSelectText.innerHTML = "Yonkers, NY";
      removeSelectActive();
      addContacts("Yonkers, NY");
    } else if (el.innerHTML === "Sherrill, NY") {
      contactsSelectText.innerHTML = "Sherrill, NY";
      removeSelectActive();
      addContacts("Sherrill, NY");
    }
  });
});

//button filter service

let buttonArray = [
  {
    name: "Gardens",
    status: false,
    class: ".service__garden",
  },
  {
    name: "Lawn",
    status: false,
    class: ".service__lawn",
  },
  {
    name: "Planting",
    status: false,
    class: ".service__planting",
  },
];

document.querySelectorAll(".service__button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const newArr = buttonArray.map((el) =>
      el.name === btn.innerHTML ? { ...el, status: !el.status } : el
    );

    buttonArray = [...newArr];

    const makeDisabled = (arr) => {
      const disabledArr = arr
        .map((el) => el.status === true)
        .sort((a, b) => a - b);
      if (disabledArr[0]) {
        btn.setAttribute("disabled", true);
        buttonArray = arr.map((el) =>
          el.name === btn.innerHTML ? { ...el, status: !el.status } : el
        );
        return true;
      }
      if (!disabledArr[0])
        document
          .querySelectorAll(".service__button")
          .forEach((btn) => btn.removeAttribute("disabled"));
      return false;
    };

    if (makeDisabled(buttonArray)) {
      return;
    }

    const addClassButton = (arr) => {
      arr.forEach((el) => {
        if (el.name === btn.innerHTML && el.status) {
          btn.classList.add("service__button--active");
        }
        if (el.name === btn.innerHTML && !el.status) {
          btn.classList.remove("service__button--active");
        }
      });
    };

    addClassButton(buttonArray);

    const filter = buttonArray.filter((el) => el.status);

    if (filter.length === 0) {
      document
        .querySelectorAll(".service__inner-item")
        .forEach((cl) => cl.classList.remove("service__inner-item--blur"));
      return;
    }

    const addClassBackround = (arr) => {
      arr.forEach((el) => {
        if (!el.status) {
          document
            .querySelectorAll(el.class)
            .forEach((cl) => cl.classList.add("service__inner-item--blur"));
        }
        if (el.status) {
          document
            .querySelectorAll(el.class)
            .forEach((cl) => cl.classList.remove("service__inner-item--blur"));
        }
      });
    };

    addClassBackround(buttonArray);
  });
});
