load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

pkg_npm(
    name = "intl-utils",
    srcs = ["package.json"],
    deps = [":intl-utils-lib"],
)

ts_library(
    name = "intl-utils-lib",
    srcs = glob(["src/*.ts"]),
    devmode_module = "commonjs",
    module_name = "@formatjs/intl-utils",
    module_root = "src",
    prodmode_module = "commonjs",
)

ts_library(
    name = "cldr-lib",
    srcs = [
        "scripts/cldr.ts",
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
    name = "cldr-bin",
    data = [":cldr-lib"],
    entry_point = ":scripts/cldr.ts",
)

genrule(
    name = "cldr",
    outs = [
        "src/aliases.ts",
        "src/parentLocales.ts",
    ],
    cmd = "$(location cldr-bin) --aliases $(@D)/src/aliases.ts --parentLocales $(@D)/src/parentLocales.ts",
    tools = [":cldr-bin"],
)
