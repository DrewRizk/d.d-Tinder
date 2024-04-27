async function loadList(list, setList) {
  let loadurl="https://cs.boisestate.edu/~scutchin/cs402/project/loadjson.php?user={dnd}"

  try {
    const response = await fetch(loadurl);
    const data = await response.json();
    console.log("got:"+JSON.stringify(data));
    setList(data);
    console.log("list setted");
  } catch(error) {
    console.error("Error fetching data:", error);
  }
  
}

async function saveList(list) {
  let saveurl="https://cs.boisestate.edu/~scutchin/cs402/project/savejson.php?user={dnd}"
  try {
    const response = await fetch(saveurl, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
    },
      body: JSON.stringify(list),
    });
    if( response.ok ) {
      console.log("data saved");
    } else {
      consoel.log("failed to save data");
    }
  } catch(error) {
    console.log("error saving data");
  }
}

export {loadList, saveList};