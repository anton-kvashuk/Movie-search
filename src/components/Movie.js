import React from 'react';

const Movie = (props)=>{
    return(
        <div className='col s12 m6 l3'>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    {
                    props.images == null ?  <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="card image" style={{width: "100%", height: 360}}/> : <img src={`https://orgogrowth.com/wp-content/uploads/2019/03/NoImage_Available.png`} alt="card image" style={{width: "100%", height: 360}} />
                    }
                </div>
                <div className="card-content">
                    <p><a href="#" onClick={()=> props.viewMovieInfo(props.movieId )}>Viev Details</a></p>
                </div>
            </div>
        </div>
    )
}
export default Movie;