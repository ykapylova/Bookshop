document.addEventListener("DOMContentLoaded", function () {
  const catalogList = [
    {
      name: "Harry Potter and the Philosopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
      img: "https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY522_.jpg",
    },
    {
      name: "Twilight",
      author: "Stephenie Meyer",
      description:
        "Bella Swan moves from Phoenix, Arizona to live with her father in Forks, Washington to allow her mother to travel with her new husband, a minor league baseball player. After moving to Forks, Bella finds herself involuntarily drawn to a mysterious, handsome boy, Edward Cullen and eventually learns that he is a member of a vampire family which drinks animal blood rather than human blood. Edward and Bella fall in love, while James, a sadistic vampire from another coven, is drawn to hunt down Bella. Edward and the other Cullens defend Bella. She escapes to Phoenix, where she is tricked into confronting James, who tries to kill her. She is seriously wounded, but Edward rescues her and they return to Forks.",
      img: "https://m.media-amazon.com/images/I/514oTdfgt1L._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "A Brief History of Time",
      author: "Stephen Hawking",
      description:
        "From the Big Bang to Black Holes is a book on theoretical cosmology by English physicist Stephen Hawking. It was first published in 1988. Hawking wrote the book for readers who had no prior knowledge of physics.",
      img: "https://m.media-amazon.com/images/I/81pQPZAFWbL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  let cartList = [];

  // создание и заполнение текстом элементов блока приветствия
  let description = document.createElement("div");
  description.classList.add("description");

  let descriptionH1 = document.createElement("h1");
  descriptionH1.innerHTML = "Welcome to my bookshop";
  let descriptionP = document.createElement("div");
  descriptionP.innerHTML =
    "Hello! My name is Yana. I love to read and I love to share. Here are some books you may get to read and then post them here to share with the others. Or you may keep them to yourself :) This way we help to reduce the manufacturing of books and save the planet.";

  // вставка элементов блока приветствия
  description.append(descriptionH1);
  description.append(descriptionP);
  document.body.append(description);

  // создание элементов блока с книгами и заказом
  let main = document.createElement("main");

  let booksElement = document.createElement("div");
  booksElement.classList.add("books");
  booksElement.innerHTML = "<h2>Books</h2>";

  let orderElement = document.createElement("div");
  orderElement.classList.add("order");

  let orderPrice = 0;

  function updateOrder() {
    pageCreate(cartList);
    if (cartList.length > 0) {
      let confirmOrderButton = document.createElement("div");
      confirmOrderButton.innerHTML = "Confirm order";
      confirmOrderButton.addEventListener("click", () => {
        let confirmForm = document.createElement("div");
        confirmForm.classList.add("popup");
        confirmForm.innerHTML = `
        <div class="popup-bg"></div>
        <div class="window">
            <form class="confirm-card">
            
                Name: <input type="text" id="name" required><br><br>
                Surname: <input type="text" id="surname" required><br><br>
                Delivery date: <input type="date" min="${
                  new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split("T")[0]
                }"><br><br>
                Street: <input type="text" id="street" required><br><br>
                House number: <input type="number" id="house-number" required><br><br>
                Flat number: <input type="number" id="flat-number" required><br><br>

                Choose the payment type
                <div class="payment">
                    <div>
                        <input type="radio" id="card" name="drone" value="card" checked />
                        <label for="card">
                            <img src="card.png">
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="cash" name="drone" value="cash" />
                        <label for="cash">
                            <img src="cash.png">
                        </label>
                    </div>
                </div>
                <br>

                <button>Order</button>

            </form>
            <div class="close-popup">
                ❌
            </div>

        </div>`;

        document.body.append(confirmForm);

        document.querySelector("form").onsubmit = (e) => {
          e.preventDefault();

          let adress =
            document.querySelector("#street").value +
            " street, " +
            document.querySelector("#house-number").value +
            "-" +
            document.querySelector("#flat-number").value;
          let name = document.querySelector("#name").value;
          let surname = document.querySelector("#surname").value;

          document.querySelector(".window").innerHTML = `
          <div>
            The order created.
            <br>The delivery address is ${adress}.
            <br>Customer: ${name} ${surname}.
          </div>
          <div class="close-popup">
              ❌
          </div>`;

          document.querySelector(".close-popup").onclick = () => {
            document.body.removeChild(confirmForm);
          };

          cartList = [];
          updateOrder();
        };

        document.querySelector(".popup-bg").onclick = () => {
          document.body.removeChild(confirmForm);
        };

        document.querySelector(".close-popup").onclick = () => {
          document.body.removeChild(confirmForm);
        };
      });
      orderElement.append(confirmOrderButton);
    }
  }

  function pageCreate(block) {
    orderElement.innerHTML = `
    <div>
        <h2>Your order: 
            <span class="order-price">0</span>$
        </h2>  
    </div>`;

    for (let bookProps of block) {
      // создание объекта с книгой
      let book = {
        item: document.createElement("div"),
        itemImg: document.createElement("img"),
        itemName: document.createElement("h2"),
        itemMinDesc: document.createElement("p"),
        itemMaxDesc: document.createElement("p"),
        itemSeeMore: document.createElement("span"),
        itemPrice: document.createElement("p"),
      };

      // заполнение книги текстом
      book.item.classList.add("books-item");
      book.itemImg.setAttribute("src", bookProps.img);
      book.itemName.innerHTML = bookProps.name;
      book.itemMaxDesc.innerHTML = bookProps.description;
      book.itemMinDesc.innerHTML = bookProps.description.slice(0, 150) + "...";
      book.itemSeeMore.innerHTML = "See more";
      book.itemPrice.innerHTML = "1$";
      book.itemPrice.classList.add("price");

      let blockImg = document.createElement("div");
      blockImg.classList.add("image");
      blockImg.append(book.itemImg);

      let blockText = document.createElement("div");
      blockText.classList.add("text");
      book.itemMinDesc.append(book.itemSeeMore);
      blockText.append(book.itemName);
      blockText.append(book.itemMinDesc);

      let bookInfo = document.createElement("div");
      bookInfo.classList.add("book-info");
      bookInfo.append(blockImg);
      bookInfo.append(blockText);

      let bookPrice = document.createElement("div");
      bookPrice.classList.add("book-price");
      bookPrice.append(book.itemPrice);

      // вставка элементов книги в книгу
      book.item.append(bookInfo);
      book.item.append(bookPrice);

      book.itemSeeMore.addEventListener("click", () => {
        showPopup(book);
      });

      if (block == catalogList) {
        let itemAddToCart = document.createElement("button");
        itemAddToCart.innerHTML = "Add to cart";
        itemAddToCart.addEventListener("click", () => {
          if (!cartList.includes(bookProps)) {
            cartList.push(bookProps);
            ++orderPrice;
            console.log(orderPrice)
            updateOrder();
          }
          document.querySelector(".order-price").innerHTML = orderPrice;
        });
        bookPrice.append(itemAddToCart);

        // вставка книги в каталог
        booksElement.append(book.item);
      } else if (block == cartList) {
        let itemRemoveFromCart = document.createElement("button");
        itemRemoveFromCart.innerHTML = "Remove from cart";
        itemRemoveFromCart.addEventListener("click", () => {
          cartList.splice(cartList.indexOf(bookProps), 1);
          updateOrder();
          document.querySelector(".order-price").innerHTML = --orderPrice;
        });
        // book.item.append(itemRemoveFromCart);
        bookPrice.append(itemRemoveFromCart);

        // вставка книги в каталог
        orderElement.append(book.item);
      }
    }
  }

  pageCreate(catalogList);
  // сборка страницы
  main.append(booksElement);
  main.append(orderElement);

  // main.append(order)
  document.body.append(main);

  function showPopup(book) {
    let popUp = document.createElement("div");
    popUp.classList.add("popup");
    popUp.innerHTML = `
        <div class="popup-bg"></div>
        <div class="window">
            <div class="image">
                <img src="${book.itemImg.getAttribute("src")}" alt="${
      book.itemName.innerHTML
    }">
            </div>
            <div>
                <h2 class="title">
                    ${book.itemName.innerHTML}
                </h2>
                <div class="description">
                ${book.itemMaxDesc.innerHTML}
                </div>
            </div>
            <div class="close-popup">
                ❌
            </div>
        </div>`;

    document.body.append(popUp);

    document.querySelector(".popup-bg").onclick = () => {
      document.body.removeChild(popUp);
    };

    document.querySelector(".close-popup").onclick = () => {
      document.body.removeChild(popUp);
    };
  }
});
