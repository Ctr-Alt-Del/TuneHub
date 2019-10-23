import React from 'react';

class Favorite extends React.Component {
    constructor(){
        super()
        this.state = {
            songFav: [],
            booksLike: []
        }
    }
    componentDidMount(){
        fetch('/favoriteMusic')
            .then(res => res.json())
            .then(music => this.setState({songFav: music}))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({booksLike: books}))
    }
    songRemove = (i) => {
        let songDeleteFromFav = {
            deleted: i.id
        }
        fetch('/favoriteMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songDeleteFromFav)
        })
        document.location.reload()
    }
    bookRemove = (i) => {
        let bookRemovedFromFav = {
            deleted: i.id
        }
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRemovedFromFav)
        })
        document.location.reload()
    }
    render(){
        return(
            <div>
                <h1>Favourites</h1>

                    <table class="w3-bordered">
                    <tbody>
                        {this.state.songFav.map(favM => (
                            <tr class="w3-hover-blue">    
                                <td><img src={favM.artwork} alt="Preview" controls/></td>
                                <td>{favM.artist}</td>
                                <td>{favM.track}</td>
                                <td><button class="button" onClick={() => {this.songRemove(favM)}}><i id="bin" class="fas fa-trash"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Favorite