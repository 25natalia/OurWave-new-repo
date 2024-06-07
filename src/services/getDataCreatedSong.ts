import Firebase from './Firebase'

export async function getDataCreatedSong(){
  try{
    const songs= await Firebase.getCreatedSongs();
    return songs;
  }catch(error){
  console.error(error)
}
}