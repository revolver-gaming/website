/* Corner ribbon on game art: a triangle wedged into the top-right, text rotated
   along the diagonal. Words stack as separate lines so "Coming soon" fits the wedge. */
export default function TagBadge({ soon }: { soon?: boolean }) {
    const label = soon ? "Coming soon" : "New";
    return (
        <span className={`tag-badge${soon ? " is-soon" : ""}`} aria-label={label}>
            <b aria-hidden>{label.split(" ").map((word) => <span key={word}>{word}</span>)}</b>
        </span>
    );
}
