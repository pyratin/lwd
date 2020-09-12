let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Documents/Projects/lwd
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +15 js/server/index.js
badd +17 js/server/schema/index.js
badd +189 js/server/schema/mutations/fns/movieDataBasicGet.js
badd +222 js/server/schema/mutations/fns/charactersGet.js
badd +21 js/server/schema/mutations/fns/cardsGet.js
badd +401 js/server/schema/mutations/movieCreate/index.js
badd +1 js/server/data/index.js
badd +19 js/server/data/movie.js
badd +22 package.json
badd +72 js/server/schema/mutations/fns/deckGet.js
badd +1 js/server/data/deck.js
badd +1 utils/datasets/fns/tmdb5000movieDecksCreate.js
badd +880 js/server/schema/mutations/fns/deckActorImageIdsAssignedGet.js
badd +1 js/server/schema/mutations/fns/deckCulledByLimitGet.js
badd +320 js/server/schema/mutations/fns/deckRenderDetailsAssignedGet.js
badd +1 js/server/schema/mutations/fns/deckCulledByCategoryGet.js
badd +1 js/server/schema/mutations/fns/mediawikiFetch.js
badd +17 js/server/schema/mutations/fns/fnDelayRun.js
badd +1 js/server/schema/mutations/fns/deckRolesGet.js
badd +1 js/server/schema/mutations/fns/cardsRenderTextAssignedGet.js
badd +248 js/server/schema/mutations/fns/deckGifyUrlsAssignedGet.js
badd +23 js/server/schema/mutations/fns/movieDataBasicCastGet.js
badd +176 js/server/schema/mutations/fns/NNPCrossMatchGet.js
badd +88 js/server/schema/mutations/fns/cardsCharactersAssignedGet.js
badd +25 js/server/schema/mutations/fns/NNPCrossMatchesGet.js
badd +43 js/server/schema/mutations/fns/NNPsCrossMatchesGet.js
badd +117 js/server/schema/mutations/fns/movieDataBasicPlotGet.js
badd +99 js/server/schema/mutations/fns/NNPsGet.js
badd +1 js/server/schema/mutations/movieSearch/index.js
badd +76 js/server/schema/mutations/fns/movieTitleRandomGet.js
badd +167 js/server/schema/mutations/fns/cardsCharacterAssignedGet.js
badd +383 js/server/schema/mutations/fns/charactersCulledByCategoryGet.js
badd +9 js/server/schema/mutations/fns/deckSpoofedGet.js
badd +24 js/server/schema/mutations/fns/spoofNamesGet.js
badd +1 js/server/schema/mutations/fns/spoofNames.js
badd +9 js/server/schema/mutations/fns/actorsGenderAssignedGet.js
badd +76 js/server/schema/mutations/fns/gifRenderedGet.js
badd +291 js/server/schema/mutations/fns/splashRenderedGet.js
badd +96 js/server/schema/mutations/fns/charactersMontageGet.js
badd +11 js/server/schema/mutations/fns/deckAsyncDataAssignedGet.js
badd +178 js/server/schema/mutations/fns/cardsRenderedGet.js
badd +108 js/server/schema/mutations/fns/cardsBase64AssignedGet.js
badd +724 js/server/schema/mutations/fns/deckCharactersSpoofedGet.js
badd +97 js/server/schema/mutations/fns/deckCardsSpoofedGet.js
badd +20 js/server/schema/mutations/fns/plotNNPsGet.js
badd +13 js/server/schema/mutations/fns/castNNPsGet.js
badd +94 js/server/schema/mutations/fns/deckSpoofableAssignedGet.js
badd +1 js/server/schema/mutations/fns/NNPBlacklistGet.js
badd +31 js/server/schema/mutations/fns/wordsTokenizedGet.js
badd +1 js/server/schema/mutations/fns/NNPWhitelistGet.js
badd +10 utils/process/data/fns/setCreate.js
badd +252 utils/process/data/fns/actorImagesCreate.js
badd +40 utils/process/data/fns/actorsCreate.js
badd +89 js/server/schema/mutations/fns/deckSplashCharactersGenderAssignedGet.js
badd +6 js/server/schema/mutations/fns/categoryWhitelistGet.js
badd +36 utils/process/source/fns/download.js
badd +1 js/server/schema/mutations/fns/categoryBlacklistGet.js
badd +106 js/server/schema/mutations/fns/charactersStarringCardIndexesAssignedGet.js
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
let s:l = 5 - ((4 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
5
normal! 03|
tabedit utils/datasets/fns/tmdb5000movieDecksCreate.js
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
let s:l = 132 - ((13 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
132
normal! 05|
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
let s:l = 20 - ((0 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
20
normal! 0
tabedit js/server/data/index.js
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
let s:l = 158 - ((33 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
158
normal! 07|
tabedit js/server/data/movie.js
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
let s:l = 49 - ((33 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
49
normal! 0
tabedit js/server/data/deck.js
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
let s:l = 65 - ((25 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
65
normal! 06|
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
let s:l = 204 - ((16 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
204
normal! 014|
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
let s:l = 181 - ((26 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
181
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
let s:l = 42 - ((9 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
42
normal! 0
tabedit js/server/schema/mutations/fns/deckGet.js
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
let s:l = 95 - ((33 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
95
normal! 08|
tabedit js/server/schema/mutations/fns/charactersStarringCardIndexesAssignedGet.js
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
let s:l = 106 - ((28 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
106
normal! 0
tabedit js/server/schema/mutations/fns/deckActorImageIdsAssignedGet.js
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
let s:l = 814 - ((18 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
814
normal! 0
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
let s:l = 1 - ((0 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
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
let s:l = 222 - ((14 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
222
normal! 04|
tabedit js/server/schema/mutations/fns/NNPsCrossMatchesGet.js
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
let s:l = 43 - ((33 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
43
normal! 0
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
let s:l = 13 - ((12 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 0
tabedit js/server/schema/mutations/fns/NNPCrossMatchGet.js
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
let s:l = 267 - ((25 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
267
normal! 07|
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
let s:l = 87 - ((25 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
87
normal! 015|
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
let s:l = 407 - ((27 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
407
normal! 04|
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
let s:l = 179 - ((33 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
179
normal! 02|
tabedit js/server/schema/mutations/fns/NNPWhitelistGet.js
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
let s:l = 8 - ((7 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
8
normal! 015|
tabedit js/server/schema/mutations/fns/NNPBlacklistGet.js
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
let s:l = 6 - ((4 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 011|
tabedit js/server/schema/mutations/fns/categoryWhitelistGet.js
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
let s:l = 1 - ((0 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
tabedit js/server/schema/mutations/fns/categoryBlacklistGet.js
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
let s:l = 6 - ((5 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 0
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
let s:l = 177 - ((28 * winheight(0) + 17) / 34)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
177
normal! 011|
tabnext 9
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
