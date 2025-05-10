using Minio;
using Minio.DataModel.Args;

namespace Backend;

using Minio;
using System;
using System.IO;
using System.Threading.Tasks;

public class ImageSaver
{
    public async Task<string> SaveImageToS3(byte[] imageBytes, string mimeType, string bucketName)
    {
        var endpoint = "127.0.0.1:9000";
        var accessKey = "admin";
        var secretKey = "password";

        var fileExtension = mimeType switch
        {
            "image/png" => ".png",
            "image/jpeg" => ".jpg",
            "image/webp" => ".webp",
            _ => throw new Exception("Unsupported image format")
        };

        var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

        // Создаем клиент MinIO
        var minioClient = new MinioClient()
            .WithEndpoint(endpoint)
            .WithCredentials(accessKey, secretKey)
            .Build();

        using var memoryStream = new MemoryStream(imageBytes);
        await minioClient.PutObjectAsync(new PutObjectArgs()
            .WithBucket(bucketName)
            .WithObject(uniqueFileName)
            .WithStreamData(memoryStream)
            .WithObjectSize(memoryStream.Length)
            .WithContentType(mimeType));

        return $"http://{endpoint}/{bucketName}/{uniqueFileName}"; 
    }
}