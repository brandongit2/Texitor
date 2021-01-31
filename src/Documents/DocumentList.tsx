import styled from "styled-components";

const Container = styled.div`
    margin: 1rem 0px;
    display: grid;
    row-gap: 1rem;
`;

const DocumentTitle = styled.span`
    font-size: 1.3em;
`;

interface PropTypes {
    data: { [key: string]: any };
}
export default function DocumentList({ data }: PropTypes) {
    return (
        <Container>
            {data &&
                (Object.entries(data) as Array<
                    [string, any]
                >).map(([id, doc]) => (
                    <DocumentTitle key={id}>{doc.title}</DocumentTitle>
                ))}
        </Container>
    );
}
