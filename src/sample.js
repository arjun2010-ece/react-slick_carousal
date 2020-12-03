import { Global } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import tw, { css, theme } from 'twin.macro'
import cursorClose from '../images/cursor-close.svg'
import { ReactComponent as Close } from '../images/icon-close.svg'
import cursorOpen, { ReactComponent as OpenIcon } from '../images/cursor-open.svg'
import { global } from '../styles/global'
import { fluid } from '../styles/typography'
import { lg, xl } from '../utils/breakpoints'
import { StyleType } from '../utils/prop-types'
import Button from './button'
import Heading from './heading'
import Image from './image'
import Text from './text'

const Profile = ({ profile, onClick, style }) => {
  const title = useMemo(() => profile.jobTitle.split('&'), [profile])
  return (
    <div
      css={[
        css`
          ${tw`cursor-pointer`}
          ${lg} {
            ${tw`flex-equal`}
            max-width: 464px;
          }
          ${xl} {
            cursor: url(${cursorOpen}) 40 40, pointer;
          }
        `,
        style,
      ]}
      onClick={() => onClick(profile)}
      aria-hidden="true"
    >
      <div css={tw`overflow-hidden relative lg:h-profile`}>
        <Image
          image={profile.image}
          style={tw`lg:(transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110 h-full)`}
        />
        <button
          type="button"
          css={tw`absolute bottom-0 right-0 transform scale-75 translate-x-3 translate-y-3 xl:hidden`}
        >
          <OpenIcon />
        </button>
      </div>
      <Heading
        content={profile.name}
        headingType="h4"
        style={css`
          ${tw`text-primary-500 text-center font-bold mt-6 mb-2`}
          line-height: 1.33;
          letter-spacing: 0.0025em;
          ${fluid(24, 28)}
        `}
      />
      {title.map((t) => (
        <Text
          key={t}
          content={t}
          style={[global`typography.body-lg`, tw`text-primary-500 text-opacity-47 text-center`]}
        />
      ))}
    </div>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  style: StyleType,
}

const ProfileModal = ({
  isOpened,
  profile,
  nextLabel,
  closeLabel,
  handleClose,
  nextSlide,
  prevSlide,
}) => {
  return (
    <>
      {isOpened && (
        <Global
          styles={css`
            body {
              ${tw`overflow-hidden`}
            }
          `}
        />
      )}
      <div
        css={tw`h-full w-full flex flex-col bg-primary-500 items-start lg:(flex-row overflow-visible)`}
        onClick={(e) => {
          e.stopPropagation()
        }}
        aria-hidden="true"
      >
        <div css={tw`lg:hidden`}>
          <button
            type="button"
            css={tw`absolute top-4 right-6 cursor-pointer bg-accent-500 h-12 w-12 z-10`}
            onClick={handleClose}
          >
            <div
              css={[
                tw`flex content-center flex-wrap h-full w-full`,
                tw`lg:(transition-transform duration-300 ease-in-out) lg:hover:(transform rotate-90)`,
              ]}
            >
              <Close css={tw`m-auto`} />
            </div>
          </button>
        </div>
        <div style={{ height: "80%" }}
          css={css`
            ${tw`w-full lg:(max-h-full h-full flex-none w-1/2)`}
            ${lg} {
              cursor: url(${cursorClose}) 29 29, auto;
            }
          `}
          aria-hidden="true"
          onClick={handleClose}
        >
          <Image image={profile.profile.image} style={tw`h-full`} />
        </div>
        <div css={tw`flex-auto flex justify-center items-start overflow-y-auto lg:(overflow-y-auto h-full)`}>
          <div css={tw`py-12 px-container-mobile lg:(w-3/5 py-12 px-0)`}>
            <div css={tw`justify-between hidden lg:(flex mb-20) xxl:mb-40`}>
              <Button
                type="primary"
                size="xs"
                label={closeLabel}
                onClick={handleClose}
                theme="grey-white"
                hideCaret
              />
              <div css={tw`flex space-x-4`}>
                <Button
                  type="secondary"
                  style={css`
                    border-color: #a29fb9;
                    svg {
                      ${tw`text-white text-opacity-60 fill-current transform rotate-180`}
                    }
                    ${lg} {
                      ${tw`transition-all duration-300 ease-in-out`}
                      transition-property: background-position, color;
                      background: linear-gradient(
                        to left,
                        ${theme`colors.transparent`} 50%,
                        ${theme`colors.white`} 50%
                      );
                      background-size: 200% 100%;
                      background-position: right bottom;
                      svg {
                        ${tw`transition-all duration-300 ease-in-out`}
                        transition-property: color, transform;
                      }
                      &:hover {
                        ${tw`bg-left-bottom text-primary-500`}
                        svg {
                          ${tw`text-primary-500 transform rotate-180 -translate-x-1`}
                        }
                      }
                    }
                  `}
                  onClick={() => prevSlide(profile.i)}
                />
                <Button
                  type="primary"
                  size="xs"
                  label={nextLabel}
                  style={css`
                    ${tw`bg-transparent border text-white text-opacity-60`}
                    border-color: #A29FB9;
                    svg {
                      height: 10px;
                      width: 6px;
                      ${tw`text-white text-opacity-60`}
                    }
                    ${lg} {
                      ${tw`transition-all duration-300 ease-in-out`}
                      transition-property: background-position, color;
                      background: linear-gradient(
                        to left,
                        ${theme`colors.transparent`} 50%,
                        ${theme`colors.white`} 50%
                      );
                      background-size: 200% 100%;
                      background-position: right bottom;
                      svg {
                        ${tw`transition-all duration-300 ease-in-out`}
                        transition-property: color, transform;
                      }
                      &:hover {
                        ${tw`bg-left-bottom text-primary-500`}
                        svg {
                          ${tw`text-primary-500 transform translate-x-1`}
                        }
                      }
                    }
                  `}
                  onClick={() => nextSlide(profile.i)}
                />
              </div>
            </div>
            <Text
              content={profile.profile.name}
              style={css`
                ${tw`text-mobile-5xl font-bold text-white tracking-h2 lg:(text-5xl max-w-1/2)`}
                line-height: 1.12;
              `}
            />
            <div css={tw`mt-4 lg:mt-6`}>
              {profile.profile.jobTitle.split('&').map((t) => (
                <Text key={t} content={t} parentEl="h6" style={tw`text-white text-opacity-47`} />
              ))}
            </div>
            <Text
              content={profile.profile.descriptionNode}
              style={css`
                p {
                  ${tw`mt-8 first-of-type:mt-0`}
                }
                ${tw`text-white text-lg mt-8 lg:(text-lg mt-16)`}
              `}
            />
          </div>
        </div>
      </div>
    </>
  )
}

ProfileModal.propTypes = {
  isOpened: PropTypes.bool,
  profile: PropTypes.object,
  nextLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  handleClose: PropTypes.func,
  nextSlide: PropTypes.func,
  prevSlide: PropTypes.func,
}

const Profiles = ({ profiles, nextLabel, closeLabel, style }) => {
  const [isOpened, setOpened] = useState(false)
  const [modalProfile, setModalProfile] = useState(null)
  const handleProfileClick = useCallback(
    (profile, i) => {
      if (!isOpened) {
        setModalProfile({ profile, i })
        setOpened(true)
      }
    },
    [setModalProfile, setOpened]
  )

  const handleClose = useCallback(() => {
    setOpened(false)
  }, [setOpened])

  const prevSlide = useCallback(
    (i) => {
      if (i > 0) setModalProfile({ i: i - 1, profile: profiles[i - 1] })
    },
    [setModalProfile, profiles]
  )

  const nextSlide = useCallback(
    (i) => {
      if (i < profiles.length - 1) setModalProfile({ i: i + 1, profile: profiles[i + 1] })
    },
    [setModalProfile, profiles]
  )

  return (
    <>
      <div
        css={[
          tw`flex flex-col space-y-14 lg:(flex-row justify-center space-y-0 space-x-8) xl:(space-x-16)`,
          style,
        ]}
      >
        {profiles.map((p, i) => (
          <Profile key={p.name} profile={p} onClick={() => handleProfileClick(p, i)} />
        ))}
      </div>
      <aside
        css={[
          tw`transition duration-300 ease-in-out -z-10 flex
          fixed inset-0 pointer-events-none opacity-0
          flex justify-center items-center
          `,
          isOpened && tw`pointer-events-auto opacity-100 z-30`,
        ]}
        onClick={handleClose}
        aria-hidden="true"
      >
        {modalProfile && (
          <ProfileModal
            isOpened={isOpened}
            profile={modalProfile}
            closeLabel={closeLabel}
            nextLabel={nextLabel}
            handleClose={handleClose}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
          />
        )}
      </aside>
    </>
  )
}

Profiles.defaultProps = {
  nextLabel: 'Next',
  closeLabel: 'Close',
}

Profiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object),
  nextLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  style: StyleType,
}

export default Profiles

