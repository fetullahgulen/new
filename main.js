const USER_ID = "461158648526143490";

async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
        const { data } = await res.json();

        // Avatar ve İsim
        document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${USER_ID}/${data.discord_user.avatar}.webp?size=160`;
        document.getElementById('username').innerText = data.discord_user.global_name || data.discord_user.username;

        // Durum (Online/DND/Idle)
        const indicator = document.getElementById('status-indicator');
        indicator.className = `absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-slate-900 status-${data.discord_status}`;

        // Spotify Kontrolü
        const spotifyBox = document.getElementById('spotify-container');
        if (data.listening_to_spotify) {
            spotifyBox.classList.remove('hidden');
            spotifyBox.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${data.spotify.album_art_url}" class="w-12 h-12 rounded-lg animate-spin-slow">
                    <div class="flex-1 overflow-hidden">
                        <p class="text-white text-xs font-bold truncate">${data.spotify.track}</p>
                        <p class="text-slate-400 text-[10px] truncate">${data.spotify.artist}</p>
                    </div>
                    <i data-lucide="music" class="text-green-500 w-4 h-4"></i>
                </div>
            `;
        } else {
            spotifyBox.classList.add('hidden');
        }

        lucide.createIcons();
    } catch (err) {
        console.error("Veri çekilemedi:", err);
    }
}

updateStatus();
setInterval(updateStatus, 30000);