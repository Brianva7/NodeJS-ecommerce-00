const addToCart = async (productId) => {
  const cartLink = document
    .getElementById("cartLink")
    .getAttribute("data-value");
  try {
    if (productId && cartLink) {
      const resp = await fetch(
        `http://localhost:8080/api/carts/${cartLink}/products/${productId}`,
        {
          method: "PUT",
        }
      );
      const result = await resp.json();
      console.log(result);

      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

const removeOne = async (productId) => {
  const cartLink = document
    .getElementById("cartLink")
    .getAttribute("data-value");
  try {
    if (productId && cartLink) {
      const resp = await fetch(
        `http://localhost:8080/api/carts/${cartLink}/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const result = await resp.json();
      console.log(result);
    }
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const purchaseCart = async () => {
  const cartLink = document
    .getElementById("cartLink")
    .getAttribute("data-value");
  try {
    if (cartLink) {
      const resp = await fetch(
        `http://localhost:8080/api/carts/${cartLink}/purchase`,
        {
          method: "POST",
        }
      );
      const result = await resp.json();
      console.log(result);
      if (result.payload && result.payload.status === "success") {
        await fetch(`http://localhost:8080/api/carts/${cartLink}`, {
          method: "PUT",
        });

        await fetch(`http://localhost:8080/api/mail/purchasemail`, {
          method: "POST",
        });

        location.reload();
      } else {
        console.log(result.payload.message);
        console.log(result.payload.insufficientStockProduct);

        await fetch(`http://localhost:8080/api/mail/purchasemail`, {
          method: "POST",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (productId) => {
  try {
    const resp = await fetch(
      `http://localhost:8080/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
