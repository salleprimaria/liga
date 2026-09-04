export const APP_LEVEL_NAME = '🏫 PRIMARIA';
export const TELEGRAM_BOT_TOKEN = '8314025136:AAG3P1AoU1rExMIeTEsE_1YDxc-Vj3r9Tac';
export const TELEGRAM_CHAT_ID = '6740086';

export const sendTelegramNotification = async (message, userEmail) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    try {
        const fullText = `📌 [TORNEOS ${APP_LEVEL_NAME}]\n👤 Usuario: ${userEmail || 'Desconocido'}\n\n${message}`;
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: fullText
            })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
            console.error("Error respuesta Telegram:", data);
        }
    } catch (e) {
        console.error("Error enviando notificación a Telegram:", e);
    }
};

export const parseLocalDate = (dateStr) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

export const formatLocalDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getFridayForDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const d = parseLocalDate(dateStr);
    const day = d.getDay();
    const diffToFriday = 5 - day;
    d.setDate(d.getDate() + diffToFriday);
    return formatLocalDate(d);
};

export const HOLIDAY_CTE_DATES = [
    // 2025-2026
    "2025-09-26", "2025-10-31", "2025-11-14", "2025-11-28", "2025-12-26", "2026-01-02",
    "2026-01-30", "2026-02-27", "2026-03-13", "2026-03-27", "2026-04-03", "2026-04-24", "2026-05-29", "2026-06-26", "2026-07-03",
    // 2026-2027 (Oficial SEP Calendario 185 Días: CTE + Registro de Calificaciones + Vacaciones)
    "2026-09-25", "2026-10-30", "2026-11-13", "2026-11-27", "2026-12-25", "2027-01-01",
    "2027-01-29", "2027-02-26", "2027-03-05", "2027-03-26", "2027-04-02", "2027-04-30", "2027-05-28", "2027-06-25", "2027-07-02"
];

export const isHolidayOrCTE = (dateString) => {
    return HOLIDAY_CTE_DATES.includes(dateString);
};

export const sortLeagues = (a, b) => {
    const isAFut = a.sport === 'Fútbol';
    const isBFut = b.sport === 'Fútbol';
    if (isAFut && !isBFut) return -1;
    if (!isAFut && isBFut) return 1;
    return a.name.localeCompare(b.name);
};

export const getSportTerms = (sport) => {
    const isPointsBased = sport === 'Básquetbol' || sport === 'Voleibol';
    return {
        unit: isPointsBased ? 'puntos' : 'goles',
        unitShort: isPointsBased ? 'PTS' : 'GOL',
        scorerHeader: isPointsBased ? 'Puntos' : 'Goles',
        scorerSingular: isPointsBased ? 'Anotador' : 'Goleador',
        scorerPlural: isPointsBased ? 'Anotadores' : 'Goleadores',
        addHomeBtn: isPointsBased ? '+ Anotador Local' : '+ Goleador Local',
        addAwayBtn: isPointsBased ? '+ Anotador Visitante' : '+ Goleador Visitante',
        noScorersMsg: isPointsBased ? 'No hay anotadores registrados.' : 'No hay goleadores registrados.',
    };
};

export const getSportScoringInfo = (sport) => {
    switch (sport) {
        case 'Fútbol': return { unit: 'goles', emoji: '⚽', scorerTitle: 'Máximo Goleador', color: '#059669' };
        case 'Básquetbol': return { unit: 'puntos', emoji: '🏀', scorerTitle: 'Máximo Anotador', color: '#c2410c' };
        case 'Tocho': return { unit: 'touchdowns', emoji: '🏈', scorerTitle: 'Máximo Anotador', color: '#be123c' };
        case 'Voleibol': return { unit: 'puntos', emoji: '🏐', scorerTitle: 'Máximo Anotador', color: '#0d9488' };
        default: return { unit: 'puntos', emoji: '🏆', scorerTitle: 'Máximo Anotador', color: '#101097' };
    }
};

export const CLUBES_CHAMPIONS = [
    { name: "Real Madrid", logo: "https://crests.football-data.org/86.png" },
    { name: "FC Barcelona", logo: "https://crests.football-data.org/81.png" },
    { name: "Bayern München", logo: "https://crests.football-data.org/5.png" },
    { name: "Manchester City", logo: "https://crests.football-data.org/65.png" },
    { name: "Paris Saint-Germain", logo: "https://crests.football-data.org/524.png" },
    { name: "Liverpool FC", logo: "https://crests.football-data.org/64.png" },
    { name: "Juventus", logo: "https://crests.football-data.org/109.png" },
    { name: "Inter Milan", logo: "https://crests.football-data.org/108.png" },
    { name: "Arsenal", logo: "https://crests.football-data.org/57.png" },
    { name: "Atletico Madrid", logo: "https://crests.football-data.org/78.png" },
    { name: "Borussia Dortmund", logo: "https://crests.football-data.org/4.png" },
    { name: "AC Milan", logo: "https://crests.football-data.org/98.png" },
    { name: "Chelsea FC", logo: "https://crests.football-data.org/61.png" },
    { name: "Bayer Leverkusen", logo: "https://crests.football-data.org/3.png" },
    { name: "Manchester United", logo: "https://crests.football-data.org/66.png" },
    { name: "Benfica", logo: "https://crests.football-data.org/1903.png" }
];

export const SPORTS_HERO_PRESETS = {
    'Fútbol': {
        title: 'Liga de Fútbol Primaria',
        subtitle: 'Torneo Oficial de Fútbol de Primaria Colegio La Salle Tuxtla',
        badge: 'Fútbol La Salle',
        bannerImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        colorTheme: 'from-emerald-600 to-teal-800'
    },
    'Básquetbol': {
        title: 'Liga de Básquetbol Primaria',
        subtitle: 'Campeonato de Baloncesto de Primaria Colegio La Salle Tuxtla',
        badge: 'Básquetbol La Salle',
        bannerImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        colorTheme: 'from-amber-600 to-orange-800'
    },
    'Tocho': {
        title: 'Liga de Tocho Flag Primaria',
        subtitle: 'Campeonato de Tocho Flag La Salle Tuxtla',
        badge: 'Tocho Flag La Salle',
        bannerImg: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80',
        colorTheme: 'from-red-600 to-rose-800'
    },
    'Voleibol': {
        title: 'Liga de Voleibol Primaria',
        subtitle: 'Torneo de Voleibol La Salle Tuxtla',
        badge: 'Voleibol La Salle',
        bannerImg: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
        colorTheme: 'from-cyan-600 to-blue-800'
    }
};

export const GILDAN_COLOR_PALETTE = [
    { name: "Amarillo Brillante", hex: "#FFD700", border: "#E6C200", isLight: true },
    { name: "Oro", hex: "#FFA500", border: "#E69500", isLight: true },
    { name: "Naranja", hex: "#FF6600", border: "#E65C00", isLight: false },
    { name: "Naranja S.", hex: "#FF4500", border: "#E63E00", isLight: false },
    { name: "Naranja Jaspe", hex: "#FF7F50", border: "#E67248", isLight: false },
    { name: "Coral", hex: "#FF6F61", border: "#E66458", isLight: false },
    { name: "Azalea", hex: "#E42575", border: "#CD2169", isLight: false },
    { name: "Palo de Rosa", hex: "#E8ADAA", border: "#D19C99", isLight: true },
    { name: "Rosa Seguridad", hex: "#FF69B4", border: "#E65F02", isLight: true },
    { name: "Rosa Tropical", hex: "#E6399B", border: "#CF338C", isLight: false },
    { name: "Rojo", hex: "#D32F2F", border: "#B71C1C", isLight: false },
    { name: "Rojo Cereza", hex: "#990000", border: "#800000", isLight: false },
    { name: "Marrón", hex: "#6D4C41", border: "#5D4037", isLight: false },
    { name: "Chocolate", hex: "#3E2723", border: "#2C1B18", isLight: false },
    { name: "Púrpura", hex: "#4A148C", border: "#3B1070", isLight: false },
    { name: "Púrpura Jaspe", hex: "#7B1FA2", border: "#6A1B8E", isLight: false },
    { name: "Azul Claro", hex: "#81D4FA", border: "#4FC3F7", isLight: true },
    { name: "Azul Celeste", hex: "#29B6F6", border: "#0288D1", isLight: true },
    { name: "Royal Jaspe", hex: "#2979FF", border: "#1765E6", isLight: false },
    { name: "Royal", hex: "#1565C0", border: "#0D47A1", isLight: false },
    { name: "Azul Marino", hex: "#001E61", border: "#0A1442", isLight: false },
    { name: "Azul Marino Jaspe", hex: "#1A237E", border: "#121858", isLight: false },
    { name: "Turquesa", hex: "#00ACC1", border: "#00838F", isLight: false },
    { name: "Turquesa Antiguo", hex: "#00838F", border: "#006064", isLight: false },
    { name: "Jade", hex: "#00897B", border: "#00695C", isLight: false },
    { name: "Verde Pasto", hex: "#2E7D32", border: "#1B5E20", isLight: false },
    { name: "Verde Césped", hex: "#4CAF50", border: "#388E3C", isLight: false },
    { name: "Verde Irlandés", hex: "#00E676", border: "#00C853", isLight: true },
    { name: "Verde Neón", hex: "#76FF03", border: "#64DD17", isLight: true },
    { name: "Verde Seguridad", hex: "#CCFF00", border: "#B2E600", isLight: true },
    { name: "Limón", hex: "#CDDC39", border: "#AFB42B", isLight: true },
    { name: "Verde Militar", hex: "#4B5320", border: "#393F18", isLight: false },
    { name: "Bosque", hex: "#1B5E20", border: "#144718", isLight: false },
    { name: "Índigo", hex: "#3F51B5", border: "#303F9F", isLight: false },
    { name: "Arena", hex: "#E3DAC9", border: "#C7BCAB", isLight: true },
    { name: "Gris Jaspe", hex: "#BDBDBD", border: "#9E9E9E", isLight: true },
    { name: "Gris Jaspe RS", hex: "#9E9E9E", border: "#757575", isLight: false },
    { name: "Grafito Jaspe", hex: "#616161", border: "#424242", isLight: false },
    { name: "Jaspe Oscuro", hex: "#37474F", border: "#263238", isLight: false },
    { name: "Carbón", hex: "#212121", border: "#000000", isLight: false },
    { name: "Negro", hex: "#000000", border: "#000000", isLight: false }
];

export const getShirtColorObj = (colorNameOrObj) => {
    if (!colorNameOrObj) return GILDAN_COLOR_PALETTE[0];
    if (typeof colorNameOrObj === 'object' && colorNameOrObj.hex) return colorNameOrObj;
    const found = GILDAN_COLOR_PALETTE.find(c => c.name.toLowerCase() === String(colorNameOrObj).toLowerCase());
    return found || GILDAN_COLOR_PALETTE[0];
};

export const getUniqueDefaultShirtColor = (existingTeams = [], preferredColorName = null) => {
    const usedNames = existingTeams.map(t => t.shirtColorName || (t.shirtColor && t.shirtColor.name)).filter(Boolean);
    if (preferredColorName && !usedNames.includes(preferredColorName)) {
        const found = GILDAN_COLOR_PALETTE.find(c => c.name.toLowerCase() === preferredColorName.toLowerCase());
        if (found) return found;
    }
    const unused = GILDAN_COLOR_PALETTE.find(c => !usedNames.includes(c.name));
    return unused || GILDAN_COLOR_PALETTE[0];
};

export const getTeamShirtColor = (team, allTeams = []) => {
    if (!team) return GILDAN_COLOR_PALETTE[0];
    
    // 1. If explicit shirtColorName is set on team, use it
    if (team.shirtColorName) {
        const found = GILDAN_COLOR_PALETTE.find(c => c.name.toLowerCase() === team.shirtColorName.toLowerCase());
        if (found) return found;
    }

    // 2. Scan presets for representative color
    let candidateColorName = null;
    const teamNameLower = (team.name || '').toLowerCase().trim();

    Object.values(PRESET_THEMES).forEach(presetList => {
        presetList.forEach(preset => {
            const pName = (preset.name || '').toLowerCase();
            if (pName && (teamNameLower.includes(pName) || pName.includes(teamNameLower))) {
                if (!candidateColorName) candidateColorName = preset.shirtColorName;
            }
        });
    });

    // Keyword fallbacks for common team names
    if (!candidateColorName) {
        if (teamNameLower.includes('américa') || teamNameLower.includes('america')) candidateColorName = 'Amarillo Brillante';
        else if (teamNameLower.includes('chivas') || teamNameLower.includes('guadalajara')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('cruz azul')) candidateColorName = 'Royal';
        else if (teamNameLower.includes('tigres')) candidateColorName = 'Oro';
        else if (teamNameLower.includes('pumas')) candidateColorName = 'Azul Marino';
        else if (teamNameLower.includes('real madrid') || teamNameLower.includes('madrid')) candidateColorName = 'Azul Claro';
        else if (teamNameLower.includes('barcelona') || teamNameLower.includes('barça')) candidateColorName = 'Royal';
        else if (teamNameLower.includes('atlético') || teamNameLower.includes('atletico')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('betis')) candidateColorName = 'Verde Pasto';
        else if (teamNameLower.includes('villarreal')) candidateColorName = 'Amarillo Brillante';
        else if (teamNameLower.includes('lakers')) candidateColorName = 'Púrpura';
        else if (teamNameLower.includes('bulls')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('celtics')) candidateColorName = 'Verde Césped';
        else if (teamNameLower.includes('warriors')) candidateColorName = 'Royal';
        else if (teamNameLower.includes('heat')) candidateColorName = 'Negro';
        else if (teamNameLower.includes('knicks')) candidateColorName = 'Naranja';
        else if (teamNameLower.includes('76ers') || teamNameLower.includes('sixers')) candidateColorName = 'Royal';
        else if (teamNameLower.includes('raptors')) candidateColorName = 'Rojo Cereza';
        else if (teamNameLower.includes('cavaliers') || teamNameLower.includes('cavs')) candidateColorName = 'Rojo Cereza';
        else if (teamNameLower.includes('pistons')) candidateColorName = 'Royal';
        else if (teamNameLower.includes('pacers')) candidateColorName = 'Oro';
        else if (teamNameLower.includes('bucks')) candidateColorName = 'Verde Pasto';
        else if (teamNameLower.includes('hawks')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('hornets')) candidateColorName = 'Turquesa';
        else if (teamNameLower.includes('magic')) candidateColorName = 'Azul Claro';
        else if (teamNameLower.includes('wizards')) candidateColorName = 'Azul Marino';
        else if (teamNameLower.includes('nuggets')) candidateColorName = 'Azul Marino Jaspe';
        else if (teamNameLower.includes('timberwolves') || teamNameLower.includes('wolves')) candidateColorName = 'Azul Marino';
        else if (teamNameLower.includes('thunder')) candidateColorName = 'Azul Celeste';
        else if (teamNameLower.includes('trail blazers') || teamNameLower.includes('blazers')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('jazz')) candidateColorName = 'Púrpura';
        else if (teamNameLower.includes('clippers')) candidateColorName = 'Azul Marino';
        else if (teamNameLower.includes('kings')) candidateColorName = 'Púrpura Jaspe';
        else if (teamNameLower.includes('rockets')) candidateColorName = 'Rojo';
        else if (teamNameLower.includes('grizzlies')) candidateColorName = 'Azul Celeste';
        else if (teamNameLower.includes('pelicans')) candidateColorName = 'Oro';
        else if (teamNameLower.includes('spurs')) candidateColorName = 'Carbón';
        else if (teamNameLower.includes('méxico') || teamNameLower.includes('mexico')) candidateColorName = 'Verde Césped';
        else if (teamNameLower.includes('brasil')) candidateColorName = 'Amarillo Brillante';
        else if (teamNameLower.includes('argentina')) candidateColorName = 'Azul Celeste';
    }

    // Determine colors already assigned to other teams in the same league
    const leagueTeams = (allTeams || []).filter(t => t.leagueId === team.leagueId);
    const usedColorNames = leagueTeams
        .filter(t => t.id !== team.id && t.shirtColorName)
        .map(t => t.shirtColorName);

    // If candidate color is not used in this league yet, use it!
    if (candidateColorName && !usedColorNames.includes(candidateColorName)) {
        const found = GILDAN_COLOR_PALETTE.find(c => c.name.toLowerCase() === candidateColorName.toLowerCase());
        if (found) return found;
    }

    // If candidate color is taken or null, find an unused color in palette for this league
    const unusedColor = GILDAN_COLOR_PALETTE.find(c => !usedColorNames.includes(c.name));
    if (unusedColor) return unusedColor;

    // Fallback by team index
    const teamIndex = leagueTeams.findIndex(t => t.id === team.id);
    const fallbackIdx = (teamIndex >= 0 ? teamIndex : 0) % GILDAN_COLOR_PALETTE.length;
    return GILDAN_COLOR_PALETTE[fallbackIdx];
};

export const PRESET_THEMES = {
    "Liga MX": [
        { name: "Club América", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/227.png", shirtColorName: "Amarillo Brillante", shirtColorHex: "#FFD700" },
        { name: "Chivas Guadalajara", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/218.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Cruz Azul", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/216.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "Tigres UANL", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/221.png", shirtColorName: "Oro", shirtColorHex: "#FFA500" },
        { name: "Pumas UNAM", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/223.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Rayados de Monterrey", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/220.png", shirtColorName: "Azul Marino Jaspe", shirtColorHex: "#1A237E" },
        { name: "Toluca FC", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/225.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Club León", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/7492.png", shirtColorName: "Verde Césped", shirtColorHex: "#4CAF50" },
        { name: "Pachuca", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/222.png", shirtColorName: "Azul Claro", shirtColorHex: "#81D4FA" },
        { name: "Santos Laguna", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/224.png", shirtColorName: "Verde Irlandés", shirtColorHex: "#00E676" },
    ],
    "Premier League": [
        { name: "Manchester City", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/382.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Liverpool FC", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/364.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Arsenal FC", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/359.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Manchester United", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/360.png", shirtColorName: "Coral", shirtColorHex: "#FF6F61" },
        { name: "Chelsea FC", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/363.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "Tottenham Hotspur", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/367.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Newcastle United", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/361.png", shirtColorName: "Negro", shirtColorHex: "#000000" },
        { name: "Aston Villa", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/362.png", shirtColorName: "Púrpura", shirtColorHex: "#4A148C" },
    ],
    "LaLiga Española": [
        { name: "Real Madrid", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/86.png", shirtColorName: "Azul Claro", shirtColorHex: "#81D4FA" },
        { name: "FC Barcelona", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/83.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "Atlético de Madrid", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Sevilla FC", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/243.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Villarreal CF", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/102.png", shirtColorName: "Amarillo Brillante", shirtColorHex: "#FFD700" },
        { name: "Valencia CF", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/94.png", shirtColorName: "Naranja", shirtColorHex: "#FF6600" },
        { name: "Athletic Bilbao", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/93.png", shirtColorName: "Naranja S.", shirtColorHex: "#FF4500" },
        { name: "Real Sociedad", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/89.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Real Betis", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/244.png", shirtColorName: "Verde Pasto", shirtColorHex: "#2E7D32" },
    ],
    "Serie A Italiana": [
        { name: "Inter de Milán", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/110.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "AC Milan", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/103.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Juventus", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/111.png", shirtColorName: "Negro", shirtColorHex: "#000000" },
        { name: "AS Roma", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/104.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Napoli", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/114.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Lazio", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/112.png", shirtColorName: "Azul Claro", shirtColorHex: "#81D4FA" },
        { name: "Fiorentina", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/109.png", shirtColorName: "Púrpura", shirtColorHex: "#4A148C" },
        { name: "Atalanta", logoUrl: "https://a.espncdn.com/i/teamlogos/soccer/500/105.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
    ],
    "Estados de México": [
        { name: "CDMX", logoUrl: "./escudos/cdmx.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Jalisco", logoUrl: "./escudos/jalisco.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Nuevo León", logoUrl: "./escudos/nuevo_leon.png", shirtColorName: "Oro", shirtColorHex: "#FFA500" },
        { name: "Chiapas", logoUrl: "./escudos/chiapas.png", shirtColorName: "Verde Irlandés", shirtColorHex: "#00E676" },
        { name: "Yucatán", logoUrl: "./escudos/yucatan.png", shirtColorName: "Naranja", shirtColorHex: "#FF6600" },
        { name: "Puebla", logoUrl: "./escudos/puebla.png", shirtColorName: "Azul Claro", shirtColorHex: "#81D4FA" },
        { name: "Veracruz", logoUrl: "./escudos/veracruz.png", shirtColorName: "Verde Césped", shirtColorHex: "#4CAF50" },
        { name: "Guanajuato", logoUrl: "./escudos/guanajuato.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
    ],
    "Selecciones (Países)": [
        { name: "México", logoUrl: "https://flagcdn.com/w160/mx.png", shirtColorName: "Verde Césped", shirtColorHex: "#4CAF50" },
        { name: "Brasil", logoUrl: "https://flagcdn.com/w160/br.png", shirtColorName: "Amarillo Brillante", shirtColorHex: "#FFD700" },
        { name: "Argentina", logoUrl: "https://flagcdn.com/w160/ar.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Francia", logoUrl: "https://flagcdn.com/w160/fr.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "España", logoUrl: "https://flagcdn.com/w160/es.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Alemania", logoUrl: "https://flagcdn.com/w160/de.png", shirtColorName: "Negro", shirtColorHex: "#000000" },
        { name: "Inglaterra", logoUrl: "https://flagcdn.com/w160/gb-eng.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Italia", logoUrl: "https://flagcdn.com/w160/it.png", shirtColorName: "Royal Jaspe", shirtColorHex: "#2979FF" },
    ],
    "Equipos NBA": [
        { name: "Boston Celtics", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png", shirtColorName: "Verde Césped", shirtColorHex: "#4CAF50" },
        { name: "Brooklyn Nets", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/bkn.png", shirtColorName: "Grafito Jaspe", shirtColorHex: "#616161" },
        { name: "New York Knicks", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/nyk.png", shirtColorName: "Naranja", shirtColorHex: "#FF6600" },
        { name: "Philadelphia 76ers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/phi.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "Toronto Raptors", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/tor.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Chicago Bulls", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/chi.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Cleveland Cavaliers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/cle.png", shirtColorName: "Rojo Cereza", shirtColorHex: "#990000" },
        { name: "Detroit Pistons", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/det.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "Indiana Pacers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/ind.png", shirtColorName: "Oro", shirtColorHex: "#FFA500" },
        { name: "Milwaukee Bucks", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/mil.png", shirtColorName: "Verde Pasto", shirtColorHex: "#2E7D32" },
        { name: "Atlanta Hawks", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/atl.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Charlotte Hornets", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/cha.png", shirtColorName: "Turquesa", shirtColorHex: "#00ACC1" },
        { name: "Miami Heat", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/mia.png", shirtColorName: "Negro", shirtColorHex: "#000000" },
        { name: "Orlando Magic", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/orl.png", shirtColorName: "Azul Claro", shirtColorHex: "#81D4FA" },
        { name: "Washington Wizards", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/was.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Denver Nuggets", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/den.png", shirtColorName: "Azul Marino Jaspe", shirtColorHex: "#1A237E" },
        { name: "Minnesota Timberwolves", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/min.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Oklahoma City Thunder", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/okc.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Portland Trail Blazers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/por.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Utah Jazz", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/uta.png", shirtColorName: "Púrpura", shirtColorHex: "#4A148C" },
        { name: "Golden State Warriors", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/gsw.png", shirtColorName: "Royal", shirtColorHex: "#1565C0" },
        { name: "LA Clippers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png", shirtColorName: "Azul Marino", shirtColorHex: "#001E61" },
        { name: "Los Angeles Lakers", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png", shirtColorName: "Púrpura", shirtColorHex: "#4A148C" },
        { name: "Phoenix Suns", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/phx.png", shirtColorName: "Naranja S.", shirtColorHex: "#FF4500" },
        { name: "Sacramento Kings", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/sac.png", shirtColorName: "Púrpura Jaspe", shirtColorHex: "#7B1FA2" },
        { name: "Dallas Mavericks", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/dal.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "Houston Rockets", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/hou.png", shirtColorName: "Rojo", shirtColorHex: "#D32F2F" },
        { name: "Memphis Grizzlies", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/mem.png", shirtColorName: "Azul Celeste", shirtColorHex: "#29B6F6" },
        { name: "New Orleans Pelicans", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/nop.png", shirtColorName: "Oro", shirtColorHex: "#FFA500" },
        { name: "San Antonio Spurs", logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/sas.png", shirtColorName: "Carbón", shirtColorHex: "#212121" }
    ]
};

export const DEFAULT_TEAMS_PRESETS = PRESET_THEMES["Premier League"];
