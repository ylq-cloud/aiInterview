
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, Video, VideoOff, MicOff, Square, PlayCircle, Loader2, CheckCircle } from 'lucide-react';
import { getQuestionById, submitRecording } from '../services/mockApi';
import { Question } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const InterviewSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Media State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  
  // Recording State
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'completed'>('idle');
  const [seconds, setSeconds] = useState(0);
  
  // Mock timer
  useEffect(() => {
    let interval: any;
    if (status === 'recording') {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Load Question
  useEffect(() => {
    if (id) {
      getQuestionById(id, language).then(q => {
        setQuestion(q || null);
        setLoading(false);
      });
    }
  }, [id, language]);

  // Init Camera
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setHasPermission(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(t => t.enabled = !isVideoOn);
      setIsVideoOn(!isVideoOn);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(t => t.enabled = !isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  const handleStartRecording = () => {
    setStatus('recording');
    setSeconds(0);
  };

  const handleStopRecording = async () => {
    setStatus('processing');
    if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop camera to indicate end
    }
    
    // Simulate API call
    if (id) {
        const mockBlob = new Blob(['mock audio'], { type: 'audio/webm' });
        await submitRecording(id, mockBlob);
        
        setTimeout(() => {
            navigate(`/result/${id}`);
        }, 2000);
    }
  };

  if (loading || !question) return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
    </div>
  );

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900">
        <div className="flex items-center space-x-2">
            <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-300">{t.session}: #{Math.floor(Math.random()*1000)}</span>
            <span className={`text-xs px-2 py-1 rounded font-bold ${status === 'recording' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                {status === 'recording' ? t.rec : t.standby}
            </span>
        </div>
        <div className="font-mono text-xl font-bold tracking-wider">{formatTime(seconds)}</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Stage */}
        <div className="flex-1 relative flex items-center justify-center p-6">
            
            {/* Camera View */}
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                {!hasPermission ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                        <VideoOff className="w-12 h-12 mb-4" />
                        <p>{t.cameraAccessRequired}</p>
                        <button onClick={startCamera} className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white text-sm">
                            {t.enableCamera}
                        </button>
                    </div>
                ) : (
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline
                        className={`w-full h-full object-cover transform scale-x-[-1] ${!isVideoOn ? 'hidden' : ''}`} 
                    />
                )}
                
                {(!isVideoOn && hasPermission) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">
                            <span className="text-2xl font-bold">AC</span>
                        </div>
                    </div>
                )}

                {/* Question Overlay (Prompter) */}
                <div className="absolute top-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-slate-700 shadow-xl transition-opacity duration-300">
                    <h2 className="text-xl font-bold text-white mb-2">{question.title}</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">{question.description}</p>
                    <div className="flex gap-2 mt-3">
                         {question.tags.map(t => (
                             <span key={t} className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{t}</span>
                         ))}
                    </div>
                </div>

                {/* Processing Overlay */}
                {status === 'processing' && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                        <h3 className="text-xl font-bold text-white">{t.analyzing}</h3>
                        <p className="text-slate-400 mt-2">{t.analyzingSub}</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 flex items-center gap-6 z-10">
                <button 
                    onClick={toggleMic}
                    className={`p-4 rounded-full transition-all ${isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
                >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </button>

                {status === 'idle' ? (
                    <button 
                        onClick={handleStartRecording}
                        className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50 transition-all transform hover:scale-105"
                    >
                        <div className="w-8 h-8 bg-white rounded-sm"></div>
                    </button>
                ) : status === 'recording' ? (
                     <button 
                        onClick={handleStopRecording}
                        className="w-20 h-20 bg-slate-800 border-4 border-red-500 rounded-full flex items-center justify-center transition-all hover:bg-slate-700"
                    >
                        <Square className="w-8 h-8 text-red-500 fill-current" />
                    </button>
                ) : (
                    <div className="w-20 h-20" /> 
                )}

                <button 
                    onClick={toggleVideo}
                    className={`p-4 rounded-full transition-all ${isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
                >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
