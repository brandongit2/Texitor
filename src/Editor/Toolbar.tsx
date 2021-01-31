import styled from "styled-components";
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';

const Container = styled.div`
    background: #fff5ea;
    color: #423629;
    display: flex;
`;

export default function Toolbar() {
    return (
        <Container>
            <button
                className="tooltip-icon-button"
            >
                <Icon icon={bold} />
            </button>
            <button
                className="tooltip-icon-button"
            >
                <Icon icon={italic} />
            </button>
            <button
                className="tooltip-icon-button"
            >
                <Icon icon={underline} />
            </button>
            <button
                className="tooltip-icon-button"
            >
                <Icon icon={list} />
            </button>
        </Container>
    );
}