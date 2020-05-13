load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("//tools:jest.bzl", "jest_test")
load("//tools:tools.bzl", "generate_package_json", "rollup_dts")

package(default_visibility = ["//visibility:public"])

SRCS = [
    "index.ts",
    "src/aliases.ts",
    "src/parentLocales.ts",
] + glob(["src/*.ts"])

PACKAGE_NAME = "intl-utils"

pkg_npm(
    name = PACKAGE_NAME,
    deps = [
        "//tools:LICENSE.md",
        "%s.d.ts" % PACKAGE_NAME,
        ":package.json",
        ":lib",
    ],
)

ts_library(
    name = "lib",
    srcs = SRCS,
    devmode_module = "commonjs",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
    prodmode_module = "commonjs",
)

generate_package_json(
    name = "generate-package-json",
    out = "package.json",
    description = "Utils for formatjs",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
)

jest_test(
    name = "test",
    srcs = [
        "//:tsconfig.json",
    ] + SRCS + glob([
        "tests/**/*.ts",
        "tests/**/*.tsx",
        "tests/**/*.snap",
    ]),
    jest_config = "//:jest.config.js",
    tags = [
        # Need to set the pwd to avoid jest needing a runfiles helper
        # Windows users with permissions can use --enable_runfiles
        # to make this test work
        "no-bazelci-windows",
        # TODO: why does this fail almost all the time, but pass on local Mac?
        "no-bazelci-mac",
    ],
    deps = [
        "@npm//@jest/transform",
        "@npm//@types/jest",
        "@npm//ts-jest",
    ],
)

# API Extractor
rollup_dts(
    name = "d-ts",
    srcs = [":lib"],
    out = "%s.d.ts" % PACKAGE_NAME,
    package_json = "package.json",
)

# CLDR Aliases

ts_library(
    name = "aliases-lib",
    srcs = [
        "scripts/aliases.ts",
    ],
    devmode_module = "commonjs",
    prodmode_module = "commonjs",
    deps = [
        "@npm//@types/fs-extra",
        "@npm//@types/minimist",
        "@npm//@types/node",
        "@npm//@types/serialize-javascript",
        "@npm//cldr-core",
        "@npm//fs-extra",
        "@npm//minimist",
        "@npm//serialize-javascript",
    ],
)

nodejs_binary(
    name = "aliases-bin",
    data = [":aliases-lib"],
    entry_point = ":scripts/aliases.ts",
)

genrule(
    name = "aliases",
    outs = [
        "src/aliases.ts",
    ],
    cmd = "$(location aliases-bin) --out $@",
    tools = [":aliases-bin"],
)

# CLDR Parent Locales

ts_library(
    name = "parentLocales-lib",
    srcs = [
        "scripts/parentLocales.ts",
    ],
    devmode_module = "commonjs",
    prodmode_module = "commonjs",
    deps = [
        "@npm//@types/fs-extra",
        "@npm//@types/minimist",
        "@npm//@types/node",
        "@npm//@types/serialize-javascript",
        "@npm//cldr-core",
        "@npm//fs-extra",
        "@npm//minimist",
        "@npm//serialize-javascript",
    ],
)

nodejs_binary(
    name = "parentLocales-bin",
    data = [":parentLocales-lib"],
    entry_point = ":scripts/parentLocales.ts",
)

genrule(
    name = "parentLocales",
    outs = [
        "src/parentLocales.ts",
    ],
    cmd = "$(location parentLocales-bin) --out $@",
    tools = [":parentLocales-bin"],
)
