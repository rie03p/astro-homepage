---
title: "Markdownでの補足"
author: rie03p
description: "補足のユースケースについて"
publishDate: 2025-02-22
tags: ["markdown", "admonitions"]
---

## 使い方

補足したい内容を`:::`で囲み、始めの`:::`にtypeをつけることで使用することができます。

例です。

```md
:::note
情報を強調する。
:::
```

Outputs:

:::note
情報を強調する。
:::

## 強調の種類

次のtypeを指定することができます。

- `note`
- `tip`
- `important`
- `warning`
- `caution`

### Note

```md
:::note
情報を強調する。
:::
```

:::note
情報を強調する。
:::

### Tip

```md
:::tip
オプション情報
:::
```

:::tip
オプション情報
:::

### Important

```md
:::important
重要な情報
:::
```

:::important
重要な情報
:::

### Caution

```md
:::caution
注意すべき情報
:::
```

:::caution
注意すべき情報
:::

### Warning

```md
:::warning
警告する情報
:::
```

:::warning
警告する情報
:::

## タイトルをカスタマイズする

タイトルは、以下のマークアップを使用してカスタマイズできます。

```md
:::note[カスタムタイトル]
これはカスタムタイトル付きのノートです。
:::
```

Outputs:

:::note[カスタムタイトル]
これはカスタムタイトル付きのノートです。
:::
