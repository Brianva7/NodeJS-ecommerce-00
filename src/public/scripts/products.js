// const host = "https://node-js-ecommerce-00.vercel.app/";
const host = "http://localhost:8080/api/carts/";

const addToCart = async (productId) => {
  const cartLink = document
    .getElementById("cartLink")
    .getAttribute("data-value");
  try {
    if (productId && cartLink) {
      const resp = await fetch(`${host}/${cartLink}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await resp.json();
      console.log(result);
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
      const resp = await fetch(`${host}/${cartLink}/products/${productId}`, {
        method: "DELETE",
      });
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
      const resp = await fetch(`${host}/${cartLink}/purchase`, {
        method: "POST",
      });
      const result = await resp.json();
      console.log(result);
      if (result.payload && result.payload.status === "success") {
        await fetch(`${host}/${cartLink}`, {
          method: "PUT",
        });

        await fetch(`${host}/api/mail/purchasemail`, {
          method: "POST",
        });

        location.reload();
      } else {
        console.log(result.payload.message);
        console.log(result.payload.insufficientStockProduct);

        await fetch(`${host}/purchasemail`, {
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
    const resp = await fetch(`${host}/${productId}`, {
      method: "DELETE",
    });
    const result = await resp.json();
    console.log(result);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
