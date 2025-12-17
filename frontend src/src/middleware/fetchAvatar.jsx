 
export async function fetchAvatar(user)
   {
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/getavatar/${user}`, {
            });
            const data = await res.json();
            const index = JSON.stringify(data[0].idavatar)
            console.log("index on:" +index);  
            
            const icons = ["wxrxy8ZG/crying", "XJ7NFVnP/dead", "wjX9Gtvr/lemon", "h4Y4zW6v/star", "mkPbX8zP/suspicious", "Tw7dJZw1/wink", "d0FVs2pJ/yum", "SxFydLyW/smile"];
            return icons[index];
   }

