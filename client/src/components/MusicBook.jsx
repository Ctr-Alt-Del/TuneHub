import React from 'react';
//this is the class component
class MusicBook extends React.Component{
    constructor(){
        super()
        this.state ={
            data: [],
            musicInput: '',
            bookInput: ''
        }
    }
    //this the function used to fetch the information
    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(data => this.setState({data}))
    }

 
    
    musicSearch = async () => {
        let search = this.state.musicInput.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            data: res
        })
    }

    bookSearch = async () => {

        let search = this.state.bookInput.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        
        let res = await getBook.json()

        this.setState({
            data: res
        })
        
        
    }
    
    favoriteMusic= (i) => {
        let fav = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        } 
        fetch('/favoriteMusic', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(fav)
        })

            alert(`Added ${fav.track} To Favorites`)


    }

    
    render(){
        return (
            <div class="body">
                <h1>Search</h1>
                <input type="text" placeholder="Title..." onChange={(e) => this.setState({musicInput: e.target.value, bookInput: e.target.value})}/>
                <button onClick={() => this.musicSearch()}>Music</button>
                <button onClick={() => this.bookSearch()}>Book</button>
                <br/>
                <table class="w3-bordered">
                    <tbody>
                        {this.state.data.map(item=> (
                            <tr class="w3-hover-blue">    
                                <td><img src={item.artworkUrl100} alt="Preview" controls/></td>
                                <td>{item.artistName}</td>
                                <td>{item.trackName}</td>
                                <td id="myDIV"><audio src={item.previewUrl}controls /></td>
                                <td><button class="button" onClick={() => this.favoriteMusic(item)}><i id="star" class="fas fa-star"></i></button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MusicBook