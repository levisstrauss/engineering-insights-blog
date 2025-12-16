"use client"

import { ScrollProgress } from "./scroll-progress"
import { Preloader } from "./ui/preloader"
import { BackToTop } from "./ui/back-to-top"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { Snowfall } from "./snowfall"

export function GlobalEnhancements() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <BackToTop />
      <KeyboardShortcuts />
      <Snowfall />
    </>
  )
}
