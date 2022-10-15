import "./styles/Header.css"
import React from "react"

function Header(props) {
    const url = 'http://localhost:3001'
    const fileInput = React.createRef()
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        for (let i = 0; i < fileInput.current.files.length; i++) {
            formData.append('subtitle',fileInput.current.files[i])
        }
        const request = new Request(
            url,
            {
                method:"POST",
                body: formData
            }
        )
        fetch(request)
            .then(resp => resp.json())
            .then(json => props.setList(json))
    }
    return (
        <header className="Header">
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="input-file">Upload subtitles</label>
                <input id="input-file" type='file' ref={fileInput} multiple />
                <input type="submit" />
            </form>
        </header>
    )
}
export default Header