document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item-input");
    const addBtn = document.getElementById("add-btn");
    const clearBtn = document.getElementById("clear-btn");
    const listContainer = document.getElementById("list-container");

    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    function renderList() {
        listContainer.innerHTML = "";
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement("div");
            listItem.className = "list-item";
            listItem.innerHTML = `
                <span class="${item.purchased ? 'purchased' : ''}">${item.name}</span>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="purchase-btn">${item.purchased ? 'Unmark' : 'Mark Purchased'}</button>
                </div>
            `;
            listContainer.appendChild(listItem);

            listItem.querySelector(".purchase-btn").addEventListener("click", () => {
                shoppingList[index].purchased = !shoppingList[index].purchased;
                saveList();
                renderList();
            });

            listItem.querySelector(".edit-btn").addEventListener("click", () => {
                const newName = prompt("Edit item:", item.name);
                if (newName) {
                    shoppingList[index].name = newName;
                    saveList();
                    renderList();
                }
            });
        });
    }

    function saveList() {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }

    addBtn.addEventListener("click", () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            shoppingList.push({ name: newItem, purchased: false });
            itemInput.value = "";
            saveList();
            renderList();
        }
    });

    clearBtn.addEventListener("click", () => {
        shoppingList = [];
        saveList();
        renderList();
    });

    renderList();
});