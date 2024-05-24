import Firebase from './Firebase'

export async function getDataCreatedSong(){
  try{
    const songs= await Firebase.getCreatedSongs();
    console.log(songs);
    return songs;
  }catch(error){
  console.error(error)
}
}