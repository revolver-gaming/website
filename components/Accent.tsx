/* Renders a CMS title, turning each *marked* part into the amber <em>:
   "Our arsenal. *Your lobby.*" → Our arsenal. <em>Your lobby.</em> */
export default function Accent({ text }: { text: string }) {
    return <>{text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}</>;
}
