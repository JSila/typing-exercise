import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [current, setCurrent] = useState(0);
    const [history, setHistory] = useState([]);

    const handleKeyPress = e => {
        const success = e.key === props.text[current];
        setHistory([...history, success]);
        setCurrent(current + 1);
    };

    const handleBackspace = (e) => {
        if (e.key !== 'Backspace') return;
        setHistory(history.slice(0, history.length-1));
        setCurrent(current - 1);
    };

    useEffect(() => {
        document.addEventListener("keypress", handleKeyPress);
        document.addEventListener("keyup", handleBackspace);

        return () => {
            document.removeEventListener("keypress", handleKeyPress);
            document.removeEventListener("keyup", handleBackspace);
        }
    });

    let chars = props.text.split("");

    history.forEach((success, i) => {
        chars[i] = <span key={i} className={success ? 'success' : 'error'}>{chars[i]}</span>;
    });

    chars[current] = <span key={current} className="current">{chars[current]}</span>;

    return (
        <div className="container">
            <div className="text">
                <p>{chars}</p>
            </div>
        </div>
    )
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const texts = [
    'Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and with warm, long hair, from Puget Sound to San Diego. Because men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland. These men wanted dogs, and the dogs they wanted were heavy dogs, with strong muscles by which to toil, and furry coats to protect them from the frost.',
    'An invitation to dinner was soon afterwards dispatched; and already had Mrs. Bennet planned the courses that were to do credit to her housekeeping, when an answer arrived which deferred it all. Mr. Bingley was obliged to be in town the following day, and, consequently, unable to accept the honour of their invitation, etc. Mrs. Bennet was quite disconcerted. She could not imagine what business he could have in town so soon after his arrival in Hertfordshire; and she began to fear that he might be always flying about from one place to another, and never settled at Netherfield as he ought to be. Lady Lucas quieted her fears a little by starting the idea of his being gone to London only to get a large party for the ball; and a report soon followed that Mr. Bingley was to bring twelve ladies and seven gentlemen with him to the assembly. The girls grieved over such a number of ladies, but were comforted the day before the ball by hearing, that instead of twelve he brought only six with him from London—his five sisters and a cousin. And when the party entered the assembly room it consisted of only five altogether—Mr. Bingley, his two sisters, the husband of the eldest, and another young man.',
    'He was, in fact, an odd mixture of small shrewdness and simple credulity. His appetite for the marvellous, and his powers of digesting it, were equally extraordinary; and both had been increased by his residence in this spell-bound region. No tale was too gross or monstrous for his capacious swallow. It was often his delight, after his school was dismissed in the afternoon, to stretch himself on the rich bed of clover bordering the little brook that whimpered by his schoolhouse, and there con over old Mather’s direful tales, until the gathering dusk of evening made the printed page a mere mist before his eyes. Then, as he wended his way by swamp and stream and awful woodland, to the farmhouse where he happened to be quartered, every sound of nature, at that witching hour, fluttered his excited imagination,—the moan of the whip-poor-will from the hillside, the boding cry of the tree toad, that harbinger of storm, the dreary hooting of the screech owl, or the sudden rustling in the thicket of birds frightened from their roost. The fireflies, too, which sparkled most vividly in the darkest places, now and then startled him, as one of uncommon brightness would stream across his path; and if, by chance, a huge blockhead of a beetle came winging his blundering flight against him, the poor varlet was ready to give up the ghost, with the idea that he was struck with a witch’s token. His only resource on such occasions, either to drown thought or drive away evil spirits, was to sing psalm tunes and the good people of Sleepy Hollow, as they sat by their doors of an evening, were often filled with awe at hearing his nasal melody, “in linked sweetness long drawn out,” floating from the distant hill, or along the dusky road.',
    'Tom skirted the block, and came round into a muddy alley that led by the back of his aunt’s cow-stable. He presently got safely beyond the reach of capture and punishment, and hastened toward the public square of the village, where two “military” companies of boys had met for conflict, according to previous appointment. Tom was General of one of these armies, Joe Harper (a bosom friend) General of the other. These two great commanders did not condescend to fight in person—that being better suited to the still smaller fry—but sat together on an eminence and conducted the field operations by orders delivered through aides-de-camp. Tom’s army won a great victory, after a long and hard-fought battle. Then the dead were counted, prisoners exchanged, the terms of the next disagreement agreed upon, and the day for the necessary battle appointed; after which the armies fell into line and marched away, and Tom turned homeward alone.',
    'The whole thing occurred in a moment—so quickly that I had no time to realize it. I have a vivid recollection of that instant, of Holmes’ triumphant expression and the ring of his voice, of the cabman’s dazed, savage face, as he glared at the glittering handcuffs, which had appeared as if by magic upon his wrists. For a second or two we might have been a group of statues. Then, with an inarticulate roar of fury, the prisoner wrenched himself free from Holmes’s grasp, and hurled himself through the window. Woodwork and glass gave way before him; but before he got quite through, Gregson, Lestrade, and Holmes sprang upon him like so many staghounds. He was dragged back into the room, and then commenced a terrific conflict. So powerful and so fierce was he, that the four of us were shaken off again and again. He appeared to have the convulsive strength of a man in an epileptic fit. His face and hands were terribly mangled by his passage through the glass, but loss of blood had no effect in diminishing his resistance. It was not until Lestrade succeeded in getting his hand inside his neckcloth and half-strangling him that we made him realize that his struggles were of no avail; and even then we felt no security until we had pinioned his feet as well as his hands. That done, we rose to our feet breathless and panting.',
    'But I have noticed that the Nice Boy and the girl who heard him play do not feel so sure that his death was best. For myself, I shall always feel that the world has lost its musical master. I have heard the music-makers of two generations, and not one of them has excelled his exquisite light[26]ness and force of touch, and that wonderful singing stress—oh! I could cry to think of it! And when we go abroad next I shall find out the name of the man who played in Leipsic and Paris and Vienna—for he must have played there once; he said he had played to thousands—and see if any one there has heard of his secret, his wonderful singing through the keys.',
    'I did not dare to go back towards the pit, but I felt a passionate longing to peer into it. I began walking, therefore, in a big curve, seeking some point of vantage and continually looking at the sand-heaps that hid these new-comers to our earth. Once a leash of thin black whips, like the arms of an octopus, flashed across the sunset and was immediately withdrawn, and afterwards a thin rod rose up, joint by joint, bearing at its apex a circular disk that spun with a wobbling motion. What could be going on there?',
    'Fernand, probably excited beyond bearing, pricked by Danglars, as the bull is by the bandilleros, was about to rush out; for he had risen from his seat, and seemed to be collecting himself to dash headlong upon his rival, when Mercédès, smiling and graceful, lifted up her lovely head, and looked at them with her clear and bright eyes. At this Fernand recollected her threat of dying if Edmond died, and dropped again heavily on his seat. Danglars looked at the two men, one after the other, the one brutalized by liquor, the other overwhelmed with love.',
];

const randomId = getRandomInt(0, texts.length - 1);

ReactDOM.render(<App text={texts[randomId]}/>, document.getElementById('app'));