import { HOST } from '@env';

const API = HOST;

console.log(HOST);

export const loginUsuario = async (credentials) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      let errorResponse;
      try {
        errorResponse = await res.json();
      } catch (error) {
        errorResponse = { message: "Error en la autenticación" };
      }
      throw new Error(errorResponse.message);
    }

    return await res.json();
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
};

export const logoutUsuario = async () => {
  try {
    const res = await fetch(`${API}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      let errorResponse;
      try {
        errorResponse = await res.json();
      } catch (error) {
        errorResponse = { message: "Error en el cierre de sesión" };
      }
      throw new Error(errorResponse.message);
    }

    return await res.json();
  } catch (error) {
    throw new Error(`Error al cerrar sesión: ${error.message}`);
  }
};

export const getUsuario = async (userId) => {
  try {
    const response = await fetch(`${API}/usuarios/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error.message);
    throw error;
  }
};

export const saveUsuario = async (newUsuario) => {
  try {
    const res = await fetch(`${API}/usuarios`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(newUsuario)
    });
    return await res.json();
  } catch (error) {
    console.error('Error al ingresar usuario:', error);
  }
};

export const updateUsuario = async (userId, usuario) => {
  try {
    const res = await fetch(`${API}/usuarios/${userId}`, {
      method: 'PUT',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (res.ok) {
      console.log('Usuario actualizado correctamente');
    } else {
      console.log('Error al actualizar el usuario:', res.statusText);
    }
  } catch (error) {
    console.log('Error al actualizar el usuario', error);
  }
};

export const saveProductos = async (newProducto) => {
  try {
    const res = await fetch(`${API}/productos`, {
      method: 'POST',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(newProducto)
    });

    return await res.json();
  } catch (error) {
    console.error('No se pudo guardar el producto', error);
    throw error;
  }
}

export const getProductos = async () => {
  try {
    const res = await fetch(`${API}/productos`);
    return await res.json();
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

export const getProductoByUsuario = async (id) => {
  try {
    const res = await fetch(`${API}/productosU/${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductosNoUsuario = async (id, nombre, categoria) => {
  try {
    let url = `${API}/productosNo/${id}`;

    if (nombre) {
      url += `?nom_pro=${nombre}`;
    }

    if (categoria) {
      url += nombre ? `&cat_pro=${categoria}` : `?cat_pro=${categoria}`;
    }

    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductos = async (id) => {
  try {
    fetch(`${API}/productos/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.log(error)
  }
};

export const updateProducto = async (id, newCant) => {
  try {
    const res = await fetch(`${API}/productos/${id}`, {
      method: 'PUT',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ sto_pro: newCant }),
    });

    if (res.ok) {
      console.log('Producto actualizado correctamente');
    } else {
      console.log('Error al actualizar el producto:', res.statusText);
    }
  } catch (error) {
    console.log('Error al actualizar el producto', error);
  }
};

export const updateProductoCal = async (id, newCal) => {
  try {
    const res = await fetch(`${API}/productosCal/${id}`, {
      method: 'PUT',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ cal_pro: newCal }),
    });

    if(res.ok){
      console.log('Calificación Actualizada');
    } else{
      console.log('Error al actualizar la cantidad:', res.statusText);
    }
  } catch (error) {
    console.log('Error al actualizar la calificacion:', error)
  }
}

export const savePedido = async (newPedido) => {
  try {
    const res = await fetch(`${API}/pedidos`, {
      method: 'POST',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(newPedido)
    });

    return await res.json();
  } catch (error) {
    console.log('No se pudo realizar el pedido', error);
  }
};

export const getPedidos = async () => {
  try {
    const res = await fetch(`${API}/pedidos`);
    return await res.json();
  } catch (error) {
    console.error('Error al cargar pedidos:', error);
  }
};

export const getPedidosUsu = async (id) => {
  try {
    const res = await fetch(`${API}/pedidosUsu/${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPedidosMio = async (id) => {
  try {
    const res = await fetch(`${API}/pedidosMio/${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updatePedidos = async (id, newPedido) => {
  try {
    const res = await fetch(`${API}/pedidos/${id}`, {
      method: 'PUT',
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(newPedido),
    });

    if (res.ok) {
      console.log('Pedido actualizado correctamente');
    } else {
      console.log('Error al actualizar el pedido:', res.statusText);
    }
  } catch (error) {
    console.error('Ocurrió un error al actualizar el pedido', error);
  }
};

export const pay = async (productId, cantidad) => {
  try {
    const res = await fetch(`${API}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, cantidad }),
    });

    const responseJson = await res.json();

    console.log('Respuesta del servidor:', responseJson);

    if (typeof responseJson === 'object') {
      return responseJson;
    } else {
      throw new Error('Respuesta no válida de PayPal');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al procesar el pago con PayPal');
  }
};