# FluentUI Icons MCP Server - Makefile

.PHONY: help setup dev build clean publish-dry publish

# Default target
help: ## Show this help message
	@echo "FluentUI Icons MCP Server - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Install dependencies
	npm install

dev: ## Start development mode (watch for changes)
	npm run dev

build: ## Build for production
	npm run build

clean: ## Clean build artifacts
	rm -rf dist/
	rm -rf node_modules/

publish-dry: build ## Dry run of npm publish (shows what would be published)
	npm publish --access public --tag rc --dry-run

publish: build ## Publish to npm
	npm publish --access public --tag rc
