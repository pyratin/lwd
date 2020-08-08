let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Projects/lwd
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +30 package.json
badd +1 js/server/index.js
badd +17 js/server/schema/index.js
badd +5 js/server/schema/mutations/fns/movieDataBasicGet.js
badd +49 js/server/schema/mutations/fns/segmentsGet.js
badd +32 js/server/schema/mutations/fns/charactersGet.js
badd +1 js/server/schema/mutations/fns/NNPsGet.js
badd +29 js/server/schema/mutations/fns/cardsGet.js
badd +263 js/server/schema/mutations/fns/gifGet.js
badd +23 js/server/schema/mutations/movieCreate/index.js
badd +1 js/server/schema/mutations/fns/wordsTaggedGet.js
badd +366 temp/castGet/index.js
badd +1 temp/castGet/data.json
badd +511 js/server/schema/mutations/fns/charactersMontageGet.js
badd +181 js/server/schema/mutations/fns/charactersBasicGet.js
badd +78 js/server/schema/mutations/fns/wordsTokenizedGet.js
badd +31 js/server/schema/mutations/fns/cardsRenderedGet.js
badd +1 js/server/schema/mutations/movieSearch/index.js
badd +1 js/server/schema/mutations/fns/sentencesTokenizedGet.js
badd +79 js/server/schema/mutations/fns/charactersActorGenderAssignedGet.js
badd +535 utils/actor/create.js
badd +106 js/server/data/set.js
badd +114 js/server/data/genre.js
badd +40 js/server/data/actor.js
badd +63 js/server/data/actorImage.js
badd +1 js/server/schema/mutations/fns/parenthesisPurgedGet.js
badd +1 js/server/schema/mutations/fns/movieDataBasicPlotGet.js
badd +0 js/server/schema/mutations/fns/movieDataBasicCastGet.js
badd +0 js/server/schema/mutations/fns/plotNNPsGet.js
badd +0 js/server/schema/mutations/fns/castNNPsGet.js
badd +1 js/server/schema/mutations/fns/NNPCrossMatchesGet.js
argglobal
%argdel
set stal=2
edit package.json
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 42 - ((20 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
42
normal! 06|
tabedit temp/castGet/index.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 219 - ((8 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
219
normal! 04|
tabedit temp/castGet/data.json
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
tabedit js/server/index.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 87 - ((32 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
87
normal! 015|
tabedit js/server/schema/index.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 231 - ((30 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
231
normal! 03|
tabedit js/server/schema/mutations/movieSearch/index.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 36 - ((28 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
36
normal! 0
tabedit js/server/schema/mutations/movieCreate/index.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 104 - ((34 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
104
normal! 0
tabedit js/server/schema/mutations/fns/gifGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 78 - ((11 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
78
normal! 010|
tabedit js/server/schema/mutations/fns/cardsGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 23 - ((19 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
23
normal! 04|
tabedit js/server/schema/mutations/fns/segmentsGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 245 - ((25 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
245
normal! 04|
tabedit js/server/schema/mutations/fns/charactersGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 18 - ((13 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 0
tabedit js/server/schema/mutations/fns/charactersBasicGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 181 - ((11 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
181
normal! 08|
tabedit js/server/schema/mutations/fns/NNPCrossMatchesGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
tabedit js/server/schema/mutations/fns/castNNPsGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 06|
tabedit js/server/schema/mutations/fns/plotNNPsGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 32 - ((31 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
32
normal! 015|
tabedit js/server/schema/mutations/fns/NNPsGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 170 - ((23 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
170
normal! 07|
tabedit js/server/schema/mutations/fns/wordsTaggedGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 59 - ((29 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
59
normal! 0
tabedit js/server/schema/mutations/fns/wordsTokenizedGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 78 - ((11 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
78
normal! 021|
tabedit js/server/schema/mutations/fns/movieDataBasicGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 87 - ((25 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
87
normal! 011|
tabedit js/server/schema/mutations/fns/movieDataBasicCastGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 75 - ((35 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
75
normal! 0
tabedit js/server/schema/mutations/fns/movieDataBasicPlotGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 46 - ((35 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
46
normal! 0
tabedit js/server/schema/mutations/fns/parenthesisPurgedGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 18 - ((17 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 0
tabedit js/server/schema/mutations/fns/sentencesTokenizedGet.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 06|
tabnext 2
set stal=1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOF
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
