## SECTION 共通ユーティリティ
# ユーティリティターゲット
.PHONY: clean print-% version

# クリーン (scripts/clean.sh)
clean:
	sh scripts/clean.sh

# 変数値を表示 (例: make print-NPM)
print-%:
	@echo $*=$($*)

# package.json の version を表示
version:
	@$(NODE) -p "require('./package.json').version"

# 任意の scripts/* を実行 (例: make run-script name=smoke)
run-script:
	@[ -n "$(name)" ] || { echo "name= を指定してください" >&2; exit 1; } ; \
	path=scripts/$(name).sh; \
	[ -x "$$path" ] || { echo "スクリプト $$path が存在しないか実行権限がありません" >&2; exit 1; } ; \
	echo "[run-script] $$path"; \
	sh "$$path"
