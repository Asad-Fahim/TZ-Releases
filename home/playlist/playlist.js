const playlists = [
    {
        id: 1,
        title: "Allama Iqbal",
        thumbnail: "https://i.ytimg.com/vi/e7IvyV5XFkU/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDZwNKtcX3eZe4XKIjHtI45gbpUNg",
        videoCount: 4,
        creator: "TZ Releases",
        URL: "/home/playlist/Allama Iqbal/index.html",
    },
    {
        id: 2,
        title: "Naat",
        thumbnail: "https://i.ytimg.com/vi/FPdulakTBac/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLASjQuHmn4ydXVx-OJeYcDMk91cig",
        videoCount: 26,
        creator: "TZ Releases",
        URL: "/home/playlist/Naat/index.html"
    },
    {
        id: 3,
        title: "Junaid Jamshed Covers",
        thumbnail: "https://i.ytimg.com/vi/SDwMmhJqHZ0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDAKiO9wT6zVgCViocW83bJHODMCA",
        videoCount: 9,
        creator: "TZ Releases",
        URL: "/home/playlist/Junaid Jamsheed/index.html",
    },
    {
        id: 4,
        title: "GHAZAL",
        thumbnail: "https://i.ytimg.com/vi/9T-0vfMGT88/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCTBuDENbu8kmW3ZdTucYcqRv9QqQ",
        videoCount: 23,
        creator: "TZ Releases",
        URL: "/home/playlist/Ghazal/index.html",
    },
    {
        id: 5,
        title: "DUA",
        thumbnail: "https://i.ytimg.com/vi/48we_RBmJW4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBx_cLgzQ_NXBb6RCMyynPO7OWdSg",
        videoCount: 10,
        creator: "TZ Releases",
        URL: "/home/playlist/Dua/index.html",
    },
    {
        id: 6,
        title: "HAMD",
        thumbnail: "https://i.ytimg.com/vi/7qNKCrWdp6A/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA55UmK3oSStogK1GYalLgg02XcVg",
        videoCount: 11,
        creator: "TZ Releases",
        URL: "/home/playlist/Hamd/index.html",
    },
    {
        id: 12,
        title: "QASEEDAH",
        thumbnail: "https://i.ytimg.com/vi/Rj0hYarGZFo/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDcKVQcjy8J4fOEXcgA-EGnUvnaxg",
        videoCount: 2,
        creator: "TZ Releases",
        URL: "/home/playlist/Qaseedah/index.html",
    }
];

function createPlaylistCard(playlist) {
    return `
        <div class="playlist-card" onclick="playPlaylist(${playlist.id})" tabindex="0" role="button">
            <div class="thumbnail-container">
                <img src="${playlist.thumbnail}" alt="${playlist.title}" class="thumbnail">
                <div class="playlist-overlay">
                    <div class="video-count">${playlist.videoCount} Releases</div>
                </div>
                <div class="play-button">
                    <svg class="play-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
            <div class="playlist-info">
                <h3 class="playlist-title">${playlist.title}</h3>
                <div class="playlist-meta">${playlist.creator}</div>
            </div>
        </div>
    `;
}

function renderPlaylists() {
    const grid = document.getElementById('playlistsGrid');
    if (grid) {
        grid.innerHTML = playlists.map(createPlaylistCard).join('');
        
        // Add event listeners after rendering
        const cards = document.querySelectorAll('.playlist-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
}

function playPlaylist(id) {
    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
        if (playlist.URL) {
            window.location.href = playlist.URL;
        } else {
            console.log('Playing playlist:', playlist.title);
        }
    }
}

function viewAllPlaylists() {
    console.log('View all playlists clicked');
}

function addPlaylist(newPlaylist) {
    playlists.push(newPlaylist);
    renderPlaylists();
}

function removePlaylist(id) {
    const index = playlists.findIndex(p => p.id === id);
    if (index > -1) {
        playlists.splice(index, 1);
        renderPlaylists();
    }
}

function searchPlaylists(query) {
    return playlists.filter(playlist => 
        playlist.title.toLowerCase().includes(query.toLowerCase()) ||
        playlist.creator.toLowerCase().includes(query.toLowerCase())
    );
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const focusedCard = document.activeElement;
    
    if (e.key === 'Enter' && focusedCard && focusedCard.classList.contains('playlist-card')) {
        focusedCard.click();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderPlaylists();
});  
