import {Background, LightRing, StyledAvatar, StyledBox} from "./js/UserAvatarStyles";

export default function UserAvatar({ size = 108, avatarSize = 90, src = '', children = 'N' }) {
    return (
        <StyledBox size={size}>
            {/* 光圈 */}
            <LightRing />
            {/* 黑色背景和头像 */}
            <Background size={size}>
                <StyledAvatar avatarSize={avatarSize} src={src}>
                    {children}
                </StyledAvatar>
            </Background>
        </StyledBox>
    );
}