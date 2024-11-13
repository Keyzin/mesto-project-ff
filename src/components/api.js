  const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
    headers: {
      authorization: "0bb03d4a-2c6b-4eca-acff-23c1e0781e6d",
      "Content-Type": "application/json",
    },
  };
   
  const getResData = async (res) => {
      if (res.ok) {       
      return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
        };
        
  const getUsersData  = async ()=>{
      return fetch(`${config.baseUrl}/users/me`,{
          headers:config.headers
      })
      .then(res=>getResData(res));
  }
  
   const getInitialCards = async () => {
      return fetch(`${config.baseUrl}/cards`,{
          headers:config.headers,
      })
        .then(res=> getResData(res));
   }

   const editProfileData = async (name, description) =>{
    return fetch(`${config.baseUrl}/users/me`,{
        method:'PATCH',
        headers:config.headers,
        body:
            JSON.stringify({
            name:name,
            about:description,
        })
        
    }).then(res=>getResData(res));
   }
    
   const addNewCard = async (name,link) =>{
    return fetch(`${config.baseUrl}/cards`,{
      method:'POST',
      headers:config.headers,
      body:
          JSON.stringify({
            name:name,
            link:link,
          }) 
   }).then(res=>getResData(res))
  }


  const deleteMyCard = async (cardId) =>{
    return fetch(`${config.baseUrl}/cards/${cardId}`,{
      method: "DELETE",
      headers: config.headers
    }).
    then(res => getResData(res));
  }


  const likeCard = async (cardId)=>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
      method: "PUT",
      headers: config.headers
    }).
    then(res => getResData(res));
  }


  const delLikeCard = async (cardId)=>{
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`,{
      method: "DELETE",
      headers:config.headers
  }).
  then(res => getResData(res));
  }

  const updatePhoto = async(url) =>{
    return fetch (`${config.baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers:config.headers,
      body:JSON.stringify({
        avatar: url,
      })
    }).
    then(res=>getResData(res));
  }
   export { getUsersData,getInitialCards,editProfileData,addNewCard,deleteMyCard,likeCard,delLikeCard,updatePhoto}