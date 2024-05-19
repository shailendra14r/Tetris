export const Action = {
    FastDrop : "FastDrop",
    SlowDrop : "SlowDrop",
    Left : "Left",
    Right : "Right",
    Rotate : "Rotate", 
    Quit : "Quit",
    Pause : "Pause"
}

const KEY = {
    " " : Action.FastDrop,
    ArrowDown : Action.SlowDrop,
    ArrowLeft : Action.Left,
    ArrowRight : Action.Right,
    ArrowUp : Action.Rotate, 
    q : Action.Quit,
    p : Action.Pause
}

export const actionForKey = (key)=> KEY[key];

