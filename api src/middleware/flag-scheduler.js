import cron from 'node-cron';
import { pool } from "../database.js";
import { formatToday } from "../middleware/date-formatter.js";
import { deleteOneAccount } from '../controllers/account_controller.js';

async function flagCheck() 
{
    let flaggedAccount;
    const today =  formatToday();
    //const today =  "28/12/2025"; //demoa varten
    console.log("flag check executed");

    try {
        const Flaggedusers = await pool.query
        ("SELECT idaccount, deletion_date FROM account WHERE deletion_flag = TRUE"); //haetaan db:stä accountid ja deletion date flagatuilta käyttäjiltä.

            for(let i = 0; i < Flaggedusers.rows.length; i++) 
            {
                flaggedAccount = Flaggedusers.rows[i].idaccount; 
                if(today === Flaggedusers.rows[i].deletion_date) 
                    //kolataan lista kaikista flagatuista käyttäjistä läpi ja mikäli deletion_date on sama kuin tämä päivä, poistetan kyseinen käyttäjä.
                    {
                        try 
                        {
                            console.log("poistetaan käyttäjä "+ flaggedAccount)
                            await pool.query("DELETE FROM account WHERE idaccount = $1 ", [flaggedAccount]);
                        }
                        catch (err) {
                        console.log(err);
                        return (err.json())
                        }
                    }
            }
      } catch (err) {
        return (err.json())
      }
}    
cron.schedule("0 12 * * *", flagCheck); //0 12 * * * tarkoittaa, että tää funktio suoritetaan kerran päivässä klo 12.
//cron.schedule("* * * * *", flagCheck); //demoa varten, suorittaa cronin minuutin intervallilla