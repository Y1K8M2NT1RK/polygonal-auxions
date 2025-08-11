## ルート Makefile (モジュール読み込み)
## - make/*.mk に分割されたターゲット群を include
## - help ターゲットは全モジュールの直前コメントを集約表示

.PHONY: help

## 共通変数定義
NPM ?= npm
NODE ?= node
PRISMA ?= npx prisma

## 色 (ANSI) / オフにしたい場合: make NO_COLOR=1 help
ifndef NO_COLOR
COLOR_TARGET=\033[1;32m
COLOR_DESC=\033[0;37m
COLOR_SECTION=\033[1;36m
COLOR_RESET=\033[0m
else
COLOR_TARGET=
COLOR_DESC=
COLOR_SECTION=
COLOR_RESET=
endif

## モジュール取り込み (アルファベット順で安定)
MK_DIR := make
MK_FILES := $(wildcard $(MK_DIR)/*.mk)
include $(MK_FILES)

# ヘルプ (全モジュール横断)
# 直前行の # コメントを説明文として抽出
help:
	@echo "Available targets (順序: ルート -> モジュール):"; \
	for f in $(firstword $(MAKEFILE_LIST)) $(MK_FILES); do \
	  awk -v CT="$(COLOR_TARGET)" -v CD="$(COLOR_DESC)" -v CR="$(COLOR_RESET)" 'BEGIN{FS=":"} \
	    /^## +SECTION/ {sec=$$0; sub(/^## +SECTION:? ?/,"",sec); printf "\n  %s%s%s\n", CT, sec, CR; next} \
	    /^#/ {c=$$0; sub(/^# ?/,"",c); next} \
	    /^[A-Za-z0-9_.%-]+:/ {t=$$1; sub(/:.*/,"",t); if(t==".PHONY") {c=""; next} if(c!=""){printf "\t- %s%-20s%s %s\n", CT, t, CR, c; c=""}}' $$f; \
	done

## 内部確認: 現在読み込まれているモジュール一覧
.PHONY: list-mods
list-mods:
	@printf "Loaded modules:\n"; for f in $(MK_FILES); do echo " - $$f"; done

## Makefile modularized: make/*.mk を編集してください
