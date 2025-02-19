import React from "react";
import NoteIcon from '@mui/icons-material/Note';
function Navbar(){

    return(
        <div className="bg-yellow-300 h-20 w-full flex items-center">
            <NoteIcon className="ml-10"/>
            <h1 className="flex font-bold text-2xl ml-2">MyNotes</h1>
</div>

    )
}
export default Navbar;