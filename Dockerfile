FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# 複製 csproj 並還原相依套件
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"

# 複製其餘檔案並建置
COPY . .
RUN dotnet publish "API/API.csproj" -c Release -o out

# 建立執行階段映像
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# 設定 ASP.NET Core 要監聽的埠
EXPOSE 8080
EXPOSE 8081

ENTRYPOINT ["dotnet", "API.dll"]