load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("//tools:jest.bzl", "jest_test")
load("//tools:tools.bzl", "generate_package_json")

package(default_visibility = ["//visibility:public"])

SRCS = [
    "index.ts",
    "src/aliases.ts",
    "src/parentLocales.ts",
] + glob(["src/*.ts"])

pkg_npm(
    name = "intl-utils",
    deps = [
        "intl-utils.d.ts",
        "package.json",
        ":intl-utils-lib",
    ],
)

ts_library(
    name = "intl-utils-lib",
    srcs = SRCS,
    devmode_module = "commonjs",
    module_name = "@formatjs/intl-utils",
    prodmode_module = "commonjs",
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
genrule(
    name = "intl-utils-d-ts",
    srcs = [
        ":intl-utils-lib",
        "tsconfig.json",
        "api-extractor.json",
        "package.json",
    ],
    outs = [
        "intl-utils.d.ts",
    ],
    cmd = "$(location //tools:api-extractor) --config $(@D)/api-extractor.json",
    tools = [
        "//tools:api-extractor",
    ],
)

genrule(
    name = "api-extractor-copy",
    srcs = [
        "//:api-extractor.json",
    ],
    outs = [
        "api-extractor.json",
    ],
    cmd = "cp -rf $< $@",
)

generate_package_json(
    name = "generate-package-json",
    out = "package.json",
    description = "Utils for formatjs",
    module_name = "@formatjs/intl-utils",
)

genrule(
    name = "tsconfig-copy",
    srcs = [
        "//:tsconfig.json",
    ],
    outs = [
        "tsconfig.json",
    ],
    cmd = "cp -rf $< $@",
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
