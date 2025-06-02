// audio.js
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentStream = null;

export let btnMicro = document.getElementById('btnMicro');
export let indicateurEnregistrement = document.getElementById('indicateurEnregistrement');

export function jouerAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(e => {
        console.error('Erreur lecture audio:', e);
        alert('Impossible de lire le message vocal');
    });
}
window.jouerAudio = jouerAudio;

function stopCurrentStream() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    mediaRecorder = null;
}

export async function startRecording(groupeActif, indexGroupeActif, tabGroupes, contactActif, indexContactActif, contacts, afficherMessages) {
    if (isRecording) return;

    try {
        stopCurrentStream();
        currentStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        let mimeType = 'audio/webm';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            mimeType = 'audio/webm;codecs=opus';
        }

        mediaRecorder = new MediaRecorder(currentStream, { mimeType });
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            const duree = Math.max(1, Math.floor(audioBlob.size / 8000));
            const messageVocal = {
                id: Date.now(),
                auteur: 'Moi',
                type: 'audio',
                audioUrl,
                duree: `0:${duree.toString().padStart(2, '0')}`,
                timestamp: new Date().toLocaleTimeString()
            };

            if (groupeActif && tabGroupes[indexGroupeActif]) {
                tabGroupes[indexGroupeActif].chatMessages.push(messageVocal);
                afficherMessages(groupeActif.chatMessages);
            } else if (contactActif && contacts[indexContactActif]) {
                contacts[indexContactActif].chatMessages.push(messageVocal);
                afficherMessages(contactActif.chatMessages);
            }

            audioChunks = [];
            stopCurrentStream();
        };

        mediaRecorder.onerror = (event) => {
            console.error('Erreur MediaRecorder:', event);
            stopCurrentStream();
        };

        mediaRecorder.onstart = () => {
            isRecording = true;
            btnMicro.classList.add('bg-red-700', 'scale-110');
            indicateurEnregistrement?.classList.remove('hidden');
        };

        mediaRecorder.start(100);
    } catch (error) {
        console.error('Erreur startRecording:', error);
    }
}

export function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }

    isRecording = false;
    btnMicro?.classList.remove('bg-red-700', 'scale-110');
    btnMicro?.classList.add('bg-red-500');
    indicateurEnregistrement?.classList.add('hidden');
}
