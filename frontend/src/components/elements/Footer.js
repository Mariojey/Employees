export default function Footer() {
    const link = "https://mariojey.github.io/React_Portfolio/";
    const target = "_blank";

    return(
        <div className="container">
            Copyright @ <small>2023 - {new Date().getFullYear()}</small>
            <a href={link} target={target}>Mariojey</a>
        </div>
    )
}