 
export async function fetchAvatar(user)
   {
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/getavatar/${user}`, {
            });
            const data = await res.json();
            const index = JSON.stringify(data[0].idavatar)
            console.log("index on:" +index);  
            
            const icons = ["crying", "dead", "lemon", "star", "suspicious", "wink", "yum", "smile"];
            return icons[index];
   }

